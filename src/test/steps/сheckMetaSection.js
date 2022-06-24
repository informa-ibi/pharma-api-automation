const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const entities = require("../../constants/entities").ENTITIES;
const feedEntityEndpoint = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT;
const jsonSchemaForMetaSection = require("../../testData/schemes/meta").jsonSchemaForMetaSection;

When(/^Send request to '(.*)' entity common endpoint$/, async (entity) => {
  const url = feedEntityEndpoint(entities[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.data = response.data;
});

Then(/^Check that the META section in the response has the correct json schema$/, async () => {
  expectChai(this.data).to.be.jsonSchema(jsonSchemaForMetaSection, "The meta section in the response should have the correct json schema");
});
