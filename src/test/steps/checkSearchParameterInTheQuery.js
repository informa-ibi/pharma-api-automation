const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const { getMultipleRandom, GET_ENTITY_ID } = require("../../util/commonUtils");
const { SEARCH_ENTITY_ENDPOINT, SEARCH_PARAMETER_ENDPOINT} = require("../../constants/apiEndpoints");
const { ENTITIES } = require("../../constants/entities");
const { SEARCH_PARAMETERS } = require("../../constants/apiSearchParameters");

When(/^Send a request to '(.*)' entity search endpoint with random search parameter and term$/, async (entity) => {
  this.entity = entity;
  const randomSearchData = getMultipleRandom(SEARCH_PARAMETERS[this.entity], 1)[0];
  $randomSearchKey = Object.keys(randomSearchData)[0];
  $randomSearchValue = getMultipleRandom(randomSearchData[$randomSearchKey], 1)[0];
  const requestUrl = `${SEARCH_ENTITY_ENDPOINT(ENTITIES[entity])}${SEARCH_PARAMETER_ENDPOINT($randomSearchKey, $randomSearchValue)}`;
  const response = await $sortAndOrderAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  $responseBodyItems = response.data.items;
  $totalRecordCount = response.data.meta.totalRecordCount;
});

Then(/^Check that the elements in the response match the search conditions by the random parameter and term for the '(.*)' entity$/, (entity) => {
  const unsortedItemIds = [];
  const responseItems = $responseBodyItems;
  const isValueArray = Array.isArray(responseItems[0][$randomSearchKey]);
  for (item of responseItems) {
    const tempValue = item[$randomSearchKey];
    if (isValueArray) {
      if (!tempValue.includes($randomSearchValue)) {
        unsortedItemIds.push(item[GET_ENTITY_ID(entity)]);
      }
    } else if (tempValue !== $randomSearchValue) {
      unsortedItemIds.push(item[GET_ENTITY_ID(entity)]);
    }
  }
  expectChai(unsortedItemIds.length).to.equal(0, `For the [${entity}] entity for ids - [${unsortedItemIds.toString()}] items are not matched by value [${$randomSearchValue}] for the key [${$randomSearchKey}]`);
});
