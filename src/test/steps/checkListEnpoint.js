const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const { ENTITIES } = require("../../constants/entities");
const { SEARCH_ENTITY_LIST_ENDPOINT } = require("../../constants/apiEndpoints");
const {searchListItemsData}= require("../../testData/common/searchListData");
const { jsonSchemaForListResponse } = require("../../testData/schemes/listEndpoint");

When(/^Send request to '(.*)' entity list endpoint$/, async (entity) => {
  const requestUrl = SEARCH_ENTITY_LIST_ENDPOINT(ENTITIES[entity]);
  const response = await $secondCommonAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  this.data = response.data;
  this.items = response.data.items;
});

Then(/^Check that the items elements in the response are correct for the '(.*)' entity$/, async (entity) => {
    expectChai(this.items).to.have.deep.members(searchListItemsData[entity], `The data for the [${entity}] entity should be correct.`);
});

Then(/^Check the response schema for the '(.*)' entity for the _list endpoint$/, async (entity) => {
    expectChai(this.data).to.be.jsonSchema(jsonSchemaForListResponse, `Response JSON schema should be correct for the [${entity}] entity`);
  });
  
