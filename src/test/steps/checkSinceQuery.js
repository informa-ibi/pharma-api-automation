const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const _ = require("lodash");
const { getMultipleRandom } = require("../../util/commonUtils");
const { FEED_ENTITY_ENDPOINT_CHANGES_SINCE_QUERY, FEED_ENTITY_ENDPOINT_CHANGES_COUNT_SINCE_QUERY, FEED_ENTITY_ENDPOINT_CHANGES_SINCE_TYPE_QUERY } = require("../../constants/apiEndpoints");
const { DATES_ARRAY, NUMBER_OF_DATES } = require("../../constants/dates");
const { ENTITIES } = require("../../constants/entities");

const TYPE_ARRAY = ["create", "change", "remove"];

When(/^Send a request to '(.*)' entity to changes endpoint with since query$/, async (entity) => {
  this.entity = entity;
  this.randomData = getMultipleRandom(DATES_ARRAY, NUMBER_OF_DATES);
  const requestUrl = FEED_ENTITY_ENDPOINT_CHANGES_SINCE_QUERY(ENTITIES[entity], this.randomData);
  const response = await $firstCommonAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  this.responseBody = response.data.items;
});

Then(/^Check that the number of elements in the response result is greater than zero$/, () => {
  expectChai(this.responseBody.length).to.be.gt(0, "Total record count should be greater than zero");
});

Then(/^Check that the date of the element is greater than the base value in the request$/, () => {
  const sinceDateTime = new Date(this.randomData).getTime();
  const idsWithIncorrectDate = [];
  for (item of this.responseBody) {
    const itemValueDate = item.date;
    const itemTime = new Date(itemValueDate).getTime();
    if (itemTime < sinceDateTime) {
      idsWithIncorrectDate.push(item.id);
    }
  }
  expectChai(idsWithIncorrectDate.length).to.equal(0, `For the [${this.entity}] entity for ids - [${idsWithIncorrectDate.toString()}], the date is greater than the base value in the request [${this.randomData}]`);
});

When(/^Send a request to '(.*)' entity to changes count endpoint with since query$/, async (entity) => {
  this.entity = entity;
  this.randomData = getMultipleRandom(DATES_ARRAY, NUMBER_OF_DATES);
  const requestUrl = FEED_ENTITY_ENDPOINT_CHANGES_COUNT_SINCE_QUERY(ENTITIES[entity], this.randomData);
  const response = await $firstCommonAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  this.responseBodyCount = response.data.data.count;
});

Then(/^Check that the number of records is greater than zero$/, () => {
  expectChai(this.responseBodyCount).to.be.gt(0, "Total record count should be greater than zero");
});

When(/^Send a request to '(.*)' entity to changes endpoint with since and random type query$/, async (entity) => {
  this.entity = entity;
  this.randomDataType = getMultipleRandom(DATES_ARRAY, NUMBER_OF_DATES);
  this.randomType = getMultipleRandom(TYPE_ARRAY, 1)[0];
  const requestUrl = FEED_ENTITY_ENDPOINT_CHANGES_SINCE_TYPE_QUERY(ENTITIES[entity], this.randomDataType, this.randomType);
  const response = await $firstCommonAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  this.sinceTypeResponseBody = response.data;
  this.sinceResponseBodyTotalRecordCount = response.data.meta.totalRecordCount;
});

Then(/^Check that the date of the all elements is greater than the base value in the request for \?since&type query parameters$/, () => {
  const sinceDateTime = new Date(this.randomDataType).getTime();
  const idsWithIncorrectDate = [];
  const items = this.sinceTypeResponseBody.items;
  for (item of items) {
    const itemValueDate = item.date;
    const itemTime = new Date(itemValueDate).getTime();
    if (itemTime < sinceDateTime) {
      idsWithIncorrectDate.push(item.id);
    }
  }
  expectChai(idsWithIncorrectDate.length).to.equal(0, `For the [${this.entity}] entity for ids - [${idsWithIncorrectDate.toString()}], the date is greater than the base value in the request [${this.randomData}] for ?since&type query parameters`);
});

Then(/^Check that all the elements in the response of the correct type according to the query with \?since&type request$/, () => {
  const idsWithIncorrectDate = [];
  const items = this.sinceTypeResponseBody.items;
  for (item of items) {
    const itemType= item.type;
    if (itemType !== this.randomType) {
      idsWithIncorrectDate.push(item.id);
    }
  }
  expectChai(idsWithIncorrectDate.length).to.equal(0, 
    `For the [${this.entity}] the type [${this.randomType}] is not equal for ids - [${idsWithIncorrectDate.toString()}] for the request with ?since&type query parameters`);
});

Then(/^Check that the total record count is greater than zero for \?since&type query parameters$/, () => {
  expectChai(this.sinceResponseBodyTotalRecordCount).to.be.gt(0, `Total record count should be greater than zero for [${this.entity}] entity for the request with since&type query parameters`);
});
