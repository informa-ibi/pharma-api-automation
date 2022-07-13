const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const _ = require("lodash");
const { getMultipleRandom, GET_ENTITY_ID } = require("../../util/commonUtils");
const { SEARCH_ENTITY_ENDPOINT, SEARCH_PARAMETER_ENDPOINT, SORT_PARAMETER_ENDPOINT, ORDER_PARAMETER_ENDPOINT, ORDER_VALUES } = require("../../constants/apiEndpoints");
const { ENTITIES } = require("../../constants/entities");
const { SEARCH_PARAMETERS } = require("../../constants/apiSearchParameters");
const { SORT_FIELDS } = require("../../constants/apiSortFields");

When(/^Send a request to '(.*)' entity endpoint with random search parameter and with random sort parameter with '(.*)' order query$/, async (entity, order) => {
  this.entity = entity;
  this.order = order;
  const randomSearchData = getMultipleRandom(SEARCH_PARAMETERS[this.entity], 1)[0];
  $randomSearchKey = Object.keys(randomSearchData)[0];
  $randomSearchValue = getMultipleRandom(randomSearchData[$randomSearchKey], 1)[0];
  $randomSortParameter = getMultipleRandom(SORT_FIELDS[this.entity], 1)[0];
  let requestUrl = `${SEARCH_ENTITY_ENDPOINT(ENTITIES[entity])}${SEARCH_PARAMETER_ENDPOINT($randomSearchKey, $randomSearchValue)}${SORT_PARAMETER_ENDPOINT($randomSortParameter)}${ORDER_PARAMETER_ENDPOINT(this.order)}`;
  const response = await $sortAndOrderAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  $responseBodyItems = response.data.items;
  $totalRecordCount = response.data.meta.totalRecordCount;
});

Then(/^Check that the data is sorted correctly and that it is displayed in the correct order - '(.*)'$/, (order) => {
  const tempArray = [];
  const actualResponseBodyCount = $responseBodyItems.length - 1;
  const entityId = GET_ENTITY_ID(this.entity);
  if (order === null || order === ORDER_VALUES.Asc) {
    if (this.randomSortParameter === "id") {
      for (let i = 0; i < actualResponseBodyCount; i++) {
        if ($responseBodyItems[i][entityId] > $responseBodyItems[i + 1][entityId]) {
          tempArray.push($responseBodyItems[i][entityId]);
        }
      }
    } else {
      for (let i = 0; i < actualResponseBodyCount; i++) {
        const firstDate = $responseBodyItems[i][this.randomSortParameter];
        const secondDate = $responseBodyItems[i + 1][this.randomSortParameter];
        if (new Date(firstDate).getTime() > new Date(secondDate).getTime()) {
          tempArray.push($responseBodyItems[i][entityId]);
        }
      }
    }
  } else if (order === ORDER_VALUES.Desc) {
    if (this.randomSortParameter === "id") {
      for (let i = 0; i < actualResponseBodyCount; i++) {
        if ($responseBodyItems[i][entityId] < $responseBodyItems[i + 1][entityId]) {
          tempArray.push($responseBodyItems[i][entityId]);
        }
      }
    } else {
      for (let i = 0; i < actualResponseBodyCount; i++) {
        const firstDate = $responseBodyItems[i][this.randomSortParameter];
        const secondDate = $responseBodyItems[i + 1][this.randomSortParameter];
        if (new Date(firstDate).getTime() < new Date(secondDate).getTime()) {
          tempArray.push($responseBodyItems[i][entityId]);
        }
      }
    }
  } else {
    expectChai.fail(`This order [${order}] is not supported.`);
  }

  expectChai(tempArray.length).to.equal(0, `For the [${this.entity}] entity for ids - [${tempArray.toString()}], should be sort by parameter [${this.randomSortParameter}]`);
});

Then(/^Check that the data is sorted correctly without specified order$/, () => {
  const tempArray = [];
  const actualResponseBodyCount = $responseBodyItems.length - 1;
  const entityId = GET_ENTITY_ID(this.entity);
  if (this.randomSortParameter === "id") {
    for (let i = 0; i < actualResponseBodyCount; i++) {
      if ($responseBodyItems[i][entityId] > $responseBodyItems[i + 1][entityId]) {
        tempArray.push($responseBodyItems[i][entityId]);
      }
    }
  } else {
    for (let i = 0; i < actualResponseBodyCount; i++) {
      const firstDate = $responseBodyItems[i][this.randomSortParameter];
      const secondDate = $responseBodyItems[i + 1][this.randomSortParameter];
      if (new Date(firstDate).getTime() > new Date(secondDate).getTime()) {
        tempArray.push($responseBodyItems[i][entityId]);
      }
    }
  }
  expectChai(tempArray.length).to.equal(0, `For the [${this.entity}] entity for ids - [${tempArray.toString()}], should be sort by parameter [${this.randomSortParameter}]`);
});

Then(/^Check that the number of elements in the response is greater than zero for '(.*)'$/, (entity) => {
  const itemsLength = $responseBodyItems.length;
  expectChai(itemsLength).to.be.gt(0, `Total number of elements should be greater than zero for [${entity}] entity`);
});

Then(/^Check that the total record count of elements in the response result is greater than zero for '(.*)'$/, (entity) => {
  expectChai($totalRecordCount).to.be.gt(0, `Total record count should be greater than zero for [${entity}] entity`);
});
