const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const _ = require("lodash");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const { ENTITIES, ENTITIES_ID } = require("../../constants/entities");
const { FEED_ENTITY_ENDPOINT } = require("../../constants/apiEndpoints");
const { GET_ENTITY_ID } = require("../../util/commonUtils");
const { feedEndpointDefaultJsonSchema, feedEndpointNextAndPreviousPagePaginationJsonSchema, feedEndpointPreviousPagePaginationJsonSchema } = require("../../testData/schemes/feedEndpointNextPageAndPreviousPage");

When(/^Send request to '(.*)' entity common feed endpoint$/, async (entity) => {
  const url = FEED_ENTITY_ENDPOINT(ENTITIES[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.defaultResponseData = response.data; //.pagination.nextPage
});

Then(/^Move to the nextPage link for the '(.*)' entity$/, async (entity) => {
  const requestURL = this.defaultResponseData.meta.queryUrl;
  const nextPageCommonUrl = this.defaultResponseData.pagination.nextPage;
  const tempBool = nextPageCommonUrl.startsWith(requestURL);
  const tempLenght = requestURL.length;
  const nextPageUrl = nextPageCommonUrl.slice(requestURL.length);
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(`${FEED_ENTITY_ENDPOINT(ENTITIES[entity])}${nextPageUrl}`);
  $statusCode = response.status;
  this.nextPageResponseData = response.data;
});

Then(/^Move to the previousPage link$/, async () => {
  const requestURL = this.defaultResponseData.meta.queryUrl;
  const previousPageCommonUrl = this.nextPageResponseData.pagination.previousPage;
  const tempBool = nextPageCommonUrl.startsWith(requestURL);
  const tempLenght = requestURL.length;
  const previousPageUrl = previousPageCommonUrl.slice(requestURL.length);
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(previousPageUrl);
  $statusCode = response.status;
  this.previousPageResponseData = response.data;
});

Then(/^Check that the data when going to the nextPage differs from those on the start page for the '(.*)' entity$/, async (entity) => {
  const itemsIdArrayDefaultPage = this.defaultResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const itemsIdArrayNextPage = this.nextPageResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const isArrayEquals = _.isEqual(itemsIdArrayDefaultPage, itemsIdArrayNextPage);
  expectChai(isArrayEquals, "data arrays should be differ").to.be.false;
});

Then(/^Check that the data when going to the previousPage differs from those on the nextPage page$/, async () => {
  const requestURL = this.defaultResponseData.meta.queryUrl;
  const previousPageCommonUrl = this.nextPageResponseData.pagination.previousPage;
  const tempBool = nextPageCommonUrl.startsWith(requestURL);
  const tempLenght = requestURL.length;
  const previousPageUrl = previousPageCommonUrl.slice(requestURL.length);
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(previousPageUrl);
  $statusCode = response.status;
  this.previousPageResponseData = response.data;
});

Then(/^There is a nextPage in the API response and response has the correct json schema$/, () => {
  expectChai(this.defaultResponseData).to.be.jsonSchema(feedEndpointDefaultJsonSchema, "The meta section in the response should have the correct json schema (only next page should be exist)");
});

Then(/^There are a nextPage and a previousPage in the API response and response has the correct json schema$/, () => {
  expectChai(this.nextPageResponseData).to.be.jsonSchema(feedEndpointNextAndPreviousPagePaginationJsonSchema, "The response should have the correct json schema (next and previous page should be exist)");
});
