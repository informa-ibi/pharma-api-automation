const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const _ = require("lodash");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const { ENTITIES, ENTITIES_ID } = require("../../constants/entities");
const { FEED_ENTITY_ENDPOINT } = require("../../constants/apiEndpoints");
const { getMultipleRandom } = require("../../util/commonUtils");
const { SEARCH_ENTITY_ENDPOINT, SEARCH_PARAMETER_ENDPOINT } = require("../../constants/apiEndpoints");
const { SEARCH_PARAMETERS } = require("../../constants/apiSearchParameters");
const {
  feedEndpointDefaultJsonSchema,
  feedEndpointNextAndPreviousPagePaginationJsonSchema,
  searchEndpointDefaultJsonSchema,
  searchEndpointNextAndPreviousPagePaginationJsonSchema,
} = require("../../testData/schemes/feedAndSearchEndpointNextPageAndPreviousPage");
const FEED_VALUE = "feed";
const SEARCH_VALUE = "search";
const HTTP_PART = "https://";

When(/^Send request to '(.*)' entity common feed endpoint$/, async (entity) => {
  const url = FEED_ENTITY_ENDPOINT(ENTITIES[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  $host = response.request.host;
  $feedResponseBody = response.data;
});

When(/^Send a request to '(.*)' entity common search endpoint with random search parameter for next page field$/, async (entity) => {
  const randomSearchData = getMultipleRandom(SEARCH_PARAMETERS[entity], 1)[0];
  this.randomSearchKey = Object.keys(randomSearchData)[0];
  this.randomSearchValue = getMultipleRandom(randomSearchData[this.randomSearchKey], 1)[0];
  this.searchCommonRequestUrl = `${SEARCH_ENTITY_ENDPOINT(ENTITIES[entity])}${SEARCH_PARAMETER_ENDPOINT(this.randomSearchKey, this.randomSearchValue)}`;
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(this.searchCommonRequestUrl);
  $statusCode = response.status;
  $host = response.request.host;
  this.searchResponseBody = response.data;
});

Then(/^Move to the nextPage link for the '(.*)' endpoint$/, async (apiEndpoint) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualResponseData = actualApiEndpoint === FEED_VALUE ? $feedResponseBody : this.searchResponseBody;
  const nextPageCommonUrl = actualResponseData.pagination.nextPage;
  const nextPageUrl = nextPageCommonUrl.replace($host, "").replace(HTTP_PART, "");
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(nextPageUrl);
  $statusCode = response.status;
  this.nextPageResponseData = response.data;
});

Then(/^Move to the previousPage link$/, async () => {
  const previousPageCommonUrl = this.nextPageResponseData.pagination.previousPage;
  const previousPageUrl = previousPageCommonUrl.replace($host, "").replace(HTTP_PART, "");
  const response = await $feedEndpointNextPreviousPageAPIClient.getRequest(previousPageUrl);
  $statusCode = response.status;
  this.previousPageResponseData = response.data;
});

Then(/^There is a only nextPage field in the API response for '(.*)' endpoint for the '(.*)' entity and response has the correct json schema$/, (apiEndpoint, entity) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualResponseData = actualApiEndpoint === FEED_VALUE ? $feedResponseBody : this.searchResponseBody;
  const actualEndpointDefaultJsonSchema = actualApiEndpoint === FEED_VALUE ? feedEndpointDefaultJsonSchema : searchEndpointDefaultJsonSchema;
  expectChai(actualResponseData).to.be.jsonSchema(
    actualEndpointDefaultJsonSchema,
    `The meta section in the response body for ${apiEndpoint} endpoint for ${entity} entity should have the correct json schema (only nextPage field should be exist)`
  );
});

Then(/^There are a nextPage and a previousPage fields in the API response for '(.*)' endpoint for the '(.*)' entity and response has the correct json schema$/, (apiEndpoint, entity) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualEndpointJsonSchema = actualApiEndpoint === FEED_VALUE ? feedEndpointNextAndPreviousPagePaginationJsonSchema : searchEndpointNextAndPreviousPagePaginationJsonSchema;
  expectChai(this.nextPageResponseData).to.be.jsonSchema(
    actualEndpointJsonSchema,
    `The meta section in the response body for ${apiEndpoint} endpoint for ${entity} entity should have the correct json schema (nextPage and previousPage field should be exist)`
  );
});

Then(/^There is a only nextPage field after previousPage in the API response for '(.*)' endpoint for the '(.*)' entity and response has the correct json schema$/, (apiEndpoint, entity) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualEndpointJsonSchema = actualApiEndpoint === FEED_VALUE ? feedEndpointDefaultJsonSchema : searchEndpointDefaultJsonSchema; 
  expectChai(this.previousPageResponseData).to.be.jsonSchema(
    actualEndpointJsonSchema,
    `The meta section in the response body for ${apiEndpoint} endpoint for ${entity} entity should have the correct json schema (only next page should be exist)`
  );
});

Then(/^Check that the data when going to the nextPage for '(.*)' endpoint differs from those on the start page for the '(.*)' entity$/, async (apiEndpoint, entity) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualResponseData = actualApiEndpoint === FEED_VALUE ? $feedResponseBody : this.searchResponseBody;
  const itemsIdArrayDefaultPage = actualResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const itemsIdArrayNextPage = this.nextPageResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const isArrayEquals = _.isEqual(itemsIdArrayDefaultPage, itemsIdArrayNextPage);
  expectChai(isArrayEquals, `The elements for nextPage and startPage should be different for ${apiEndpoint} endpoint for the ${entity} entity for ids ${_.intersection(itemsIdArrayDefaultPage, itemsIdArrayNextPage)}`).to.be.false;
});

Then(/^Check that the data when going to the previousPage differs for '(.*)' endpoint for the '(.*)' entity from those on the nextPage page$/, async (apiEndpoint, entity) => {
  const itemsIdArrayPreviousPage = this.previousPageResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const itemsIdArrayNextPage = this.nextPageResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const isArrayEquals = _.isEqual(itemsIdArrayNextPage, itemsIdArrayPreviousPage);
  expectChai(isArrayEquals, `The elements for nextPage and startPage should be different for ${apiEndpoint} endpoint for the ${entity} entity for ids ${_.intersection(itemsIdArrayNextPage, itemsIdArrayPreviousPage)}`).to.be.false;
});

Then(/^Check that the data when going to the previousPage the same for start page for '(.*)' endpoint for the '(.*)' entity$/, async (apiEndpoint, entity) => {
  const actualApiEndpoint = getApiEndpoint(apiEndpoint);
  const actualDefaultResponseData = actualApiEndpoint === FEED_VALUE ? $feedResponseBody : this.searchResponseBody;
  const itemsIdArrayStartPage = actualDefaultResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const itemsIdArrayPreviousPage = this.previousPageResponseData.items.map((a) => a[ENTITIES_ID[entity]]);
  const isArrayEquals = _.isEqual(itemsIdArrayStartPage, itemsIdArrayPreviousPage);
  expectChai(isArrayEquals, `The elements for previousPage and startPage should be same for ${apiEndpoint} endpoint for the ${entity} entity for ids ${_.difference(itemsIdArrayStartPage, itemsIdArrayPreviousPage)}`).to.be.true;
});

function getApiEndpoint(conditional) {
  switch (conditional) {
  case "feed": return "feed";
  case "search": return "search";
  default:
    expectChai.fail(`The condition [${conditional}]  should be "feed"" or "search"`);
    break;
  }
}