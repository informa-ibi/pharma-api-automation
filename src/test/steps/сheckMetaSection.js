const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const { ENTITIES } = require("../../constants/entities");
const { FEED_ENTITY_ENDPOINT } = require("../../constants/apiEndpoints");
const { jsonSchemaForMetaSection } = require("../../testData/schemes/meta");

When(/^Send request to '(.*)' entity common endpoint$/, async (entity) => {
  const url = FEED_ENTITY_ENDPOINT(ENTITIES[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.data = response.data;
});

Then(/^Check that the META section in the response has the correct json schema$/, async () => {
  expectChai(this.data).to.be.jsonSchema(jsonSchemaForMetaSection, "The meta section in the response should have the correct json schema");
});
