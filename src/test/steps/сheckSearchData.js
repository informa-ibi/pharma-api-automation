const { When, Then } = require("@cucumber/cucumber");
const searchEntityEndpoint = require("../../constants/apiEndpoints").searchEntityEndpoint;
const searchData = require("../../testData/searchBodyApi/trialApiSearchBody");

When(/^Send a POST request to trial entity with '(.*)' search body$/, async (conditional) => {
  const url = searchEntityEndpoint('trial');
  const response = await $firstCommonAPIClient.postRequest(url, searchData.searchBody[conditional]);
  $statusCode = response.status;
});

//TODO: add request processing
Then(/^Check the result for '(.*)' search body in the response body$/, async (conditional) => {
  switch (conditional) {
    case "Is":
      break;
    case "IsNot":
      break;
    case "IsOnly":
      break;
    case "GreaterThan":
      break;
    case "GreaterThanOrEqualTo":
      break;
    case "LessThan":
      break;
    case "LessThanOrEqualTo":
      break;
    case "Between":
      break;
    case "Contains":
      break;
    case "NotContains":
      break;
    case "Group":
      break;
    case "Advanced":
      break;
    default:
      break;
  }
});
