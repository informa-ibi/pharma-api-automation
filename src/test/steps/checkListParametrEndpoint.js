const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const { ENTITIES } = require("../../constants/entities");
const { SEARCH_ENTITY_LIST_PARAMETER_ENDPOINT } = require("../../constants/apiEndpoints");
const { searchListItemsData } = require("../../testData/common/searchListData");
const utils = require("../../util/commonUtils");
const { jsonSchemaForListParameterResponse } = require("../../testData/schemes/listEndpoint");

When(/^Send request to '(.*)' entity to _list_parameter endpoint for random parameter$/, async (entity) => {
  const array = searchListItemsData[entity];
  const randomNameParameter = utils.getMultipleRandom(array, 1)[0].name;
  const requestUrl = SEARCH_ENTITY_LIST_PARAMETER_ENDPOINT(ENTITIES[entity], randomNameParameter);
  const response = await $firstCommonAPIClient.getRequest(requestUrl);
  $statusCode = response.status;
  this.data = response.data;
});

Then(/^Check the response schema for the '(.*)' entity for the _list_parameter endpoint$/, async (entity) => {
  expectChai(this.data).to.be.jsonSchema(jsonSchemaForListParameterResponse, `Response JSON schema should be correct for the [${entity}] entity`);
});
