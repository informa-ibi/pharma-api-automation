const { When, Then } = require("@cucumber/cucumber");
var chaiXml = require("chai-xml");
var chai = require("chai");
chai.use(chaiXml);
const expectChai = chai.expect;
const entities = require("../../constants/entities").ENTITIES;
const feedEntityEndpoint = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT;

When(/^Send request with 'accept xml header' to '(.*)' entity common endpoint$/, async (entity) => {
  const url = feedEntityEndpoint(entities[entity]);
  const response = await $xmlCommonAPIClient.getRequest(url);
  $statusCode = await response.status;
  this.responseBody = response.data;
});

Then(/^Check that the response body is returned in XML format$/, async () => {
  expectChai(this.responseBody, "The response body should be in XML format").xml.to.be.valid();
});
