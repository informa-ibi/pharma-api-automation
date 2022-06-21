const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const _ = require("lodash");
const commonFunctions = require("../../util/commonUtils");
const feedEntityEndpointFieldsQuery = require("../../constants/apiEndpoints").feedEntityEndpointFieldsQuery;
const fields = require("../../testData/fields/fields");
const entities = require("../../constants/entities").entities;

When(/^Send a request to '(.*)' entity specifying '(.*)' random fields in the query$/, async (entity, fieldsCount) => {
  const queryParametersForRequest = commonFunctions.getMultipleRandom(fields.queryFields[entity], fieldsCount);
  this.expectedItemsParameters = [...queryParametersForRequest, ...fields.commonFields];
  const url = feedEntityEndpointFieldsQuery(entities[entity], queryParametersForRequest.toString());
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.responseBody = response.data.items;
});

Then(/^Check that the fields specified in the query are present in the body of the response$/, async () => {
  const fieldsMissingInTheResponseBody = [];

  for (item of this.responseBody) {
    const keysObjectArray = Object.keys(item);
    const diff = _.xor(keysObjectArray.sort(), this.expectedItemsParameters.sort());
    if (diff.length != 0) {
      fieldsMissingInTheResponseBody.push(diff);
    }
  }
  expectChai( fieldsMissingInTheResponseBody.length).to.equal(0, `The fields specified in the query should be in the response body : ${fieldsMissingInTheResponseBody.toString()}`);
});
