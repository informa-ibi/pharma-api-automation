const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const _ = require("lodash");
const commonFunctions = require("../../util/commonUtils");
const feedEntityEndpointChangesSinceQuery = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT_CHANGES_SINCE_QUERY
const feedEntityEndpointChangesCountSinceQuery = require("../../constants/apiEndpoints").FEED_ENTITY_ENDPOINT_CHANGES_COUNT_SINCE_QUERY;
const datesArray = require("../../constants/dates").DATES_ARRAY;
const numberOfDates = require("../../constants/dates").NUMBER_OF_DATES;
const entities = require("../../constants/entities").ENTITIES;

When(/^Send a request to '(.*)' entity to changes endpoint with since query$/, async (entity) => {
  this.entity = entity;
  this.randomData = commonFunctions.getMultipleRandom(datesArray, numberOfDates);
  const url = feedEntityEndpointChangesSinceQuery(entities[entity], this.randomData);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.responseBody = response.data.items;
});

Then(/^Check that the number of elements in the response result is greater than zero$/, async () => {
  expectChai(this.responseBody.length).to.be.gt(0, "Total record count should be greater than zero");
});

Then(/^Check that the date of the element is greater than the base value in the request$/, async () => {
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
  this.randomData = commonFunctions.getMultipleRandom(datesArray, numberOfDates);
  const url = feedEntityEndpointChangesCountSinceQuery(entities[entity], this.randomData);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.responseBodyCount = response.data.data.count;
});

Then(/^Check that the number of records is greater than zero$/, async () => {
  expectChai(this.responseBodyCount).to.be.gt(0, "Total record count should be greater than zero");
});
