const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const entities = require("../../constants/entities").ENTITIES;
const pageSize = require("../../constants/pageSize");
const feedEntityEndpoint = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT;
const feedEntityEndpointPagesizeQuery = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT_PAGESIZE_QUERY;
const timeouts = require("../../constants/timeouts");

When(/^Send request to '(.*)' entity common endpoint with default setting for the page size$/, async (entity) => {
  const url = feedEntityEndpoint(entities[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.dataItems = response.data.items;
});

When(/^Send request to '(.*)' entity common endpoint with page size equal to '(.*)'$/, async (entity, pagesize) => {
  const url = feedEntityEndpointPagesizeQuery(entities[entity], pagesize);
  const config = { timeout: timeouts.LONG_REQUEST_EXECUTION_TIME};
  const response = await $firstCommonAPIClient.getRequest(url, config);
  $statusCode = response.status;
  this.dataItems = response.data.items;
});

Then(/^Expected that the number of elements will be equal to the standard value$/, async () => {
  expectChai(this.dataItems.length).to.equal(pageSize.DEFAULT_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE, "The page size should have a default size");
});

Then(/^Expected that the number of elements will be equal to the max value$/, async () => {
  expectChai(this.dataItems.length).to.equal(pageSize.MAX_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE, "The page size should have a max size");
});

Then(/^Expected that the number of elements to be equal to the expected value of '(.*)' elements$/, async (pagesize) => {
  expectChai(this.dataItems.length).to.equal(parseInt(pagesize), "The page size should have a expected size");
});
