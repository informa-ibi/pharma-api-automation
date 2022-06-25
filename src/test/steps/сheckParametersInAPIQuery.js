const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const _ = require("lodash");
const { getMultipleRandom } = require("../../util/commonUtils");
const { FEED_ENTITY_ENDPOINT_FIELDS_QUERY } = require("../../constants/apiEndpoints");
const fields = require("../../testData/fields/fields");
const { ENTITIES } = require("../../constants/entities");

When(/^Send a request to '(.*)' entity specifying '(.*)' random fields in the query$/, async (entity, fieldsCount) => {
  const queryParametersForRequest = getMultipleRandom(fields.queryFields[entity], fieldsCount);
  this.expectedItemsParameters = [...queryParametersForRequest, ...fields.commonFields];
  const url = FEED_ENTITY_ENDPOINT_FIELDS_QUERY(ENTITIES[entity], queryParametersForRequest.toString());
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
  expectChai(fieldsMissingInTheResponseBody.length).to.equal(0, `The fields specified in the query should be in the response body : ${fieldsMissingInTheResponseBody.toString()}`);
});
