const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const { ENTITIES } = require("../../constants/entities");
const { DEFAULT_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE, MAX_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE } = require("../../constants/pageSize");
const { FEED_ENTITY_ENDPOINT, FEED_ENTITY_ENDPOINT_PAGESIZE_QUERY } = require("../../constants/apiEndpoints");
const { LONG_REQUEST_EXECUTION_TIME } = require("../../constants/timeouts");

When(/^Send request to '(.*)' entity common endpoint with default setting for the page size$/, async (entity) => {
  const url = FEED_ENTITY_ENDPOINT(ENTITIES[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.dataItems = response.data.items;
});

When(/^Send request to '(.*)' entity common endpoint with page size equal to '(.*)'$/, async (entity, pagesize) => {
  const url = FEED_ENTITY_ENDPOINT_PAGESIZE_QUERY(ENTITIES[entity], pagesize);
  const config = { timeout: LONG_REQUEST_EXECUTION_TIME };
  const response = await $firstCommonAPIClient.getRequest(url, config);
  $statusCode = response.status;
  this.dataItems = response.data.items;
});

Then(/^Expected that the number of elements will be equal to the standard value$/, async () => {
  expectChai(this.dataItems.length).to.equal(DEFAULT_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE, "The page size should have a default size");
});

Then(/^Expected that the number of elements will be equal to the max value$/, async () => {
  expectChai(this.dataItems.length).to.equal(MAX_NUMBER_OF_ELEMENTS_IN_THE_RESPONSE, "The page size should have a max size");
});

Then(/^Expected that the number of elements to be equal to the expected value of '(.*)' elements$/, async (pagesize) => {
  expectChai(this.dataItems.length).to.equal(parseInt(pagesize), "The page size should have a expected size");
});
