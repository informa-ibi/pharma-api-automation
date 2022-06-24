const { When, Then } = require("@cucumber/cucumber");
const chai = require("chai");
chai.should();
const expectChai = chai.expect;
chai.use(require('chai-things'));
const searchEntityEndpoint = require("../../constants/apiEndpoints").searchEntityEndpoint;
const trialSearchData = require("../../testData/searchBodyApi/trialApiSearchBody");
const drugSearchData = require("../../testData/searchBodyApi/drugSearchBody");
const organizationSearchData = require("../../testData/searchBodyApi/organizationSearchBody");

const arrayTypeValue = 'array';

When(/^Send a POST request to trial entity with '(.*)' search body$/, async (conditional) => {
  const url = searchEntityEndpoint('trial');
  this.postSearchData = trialSearchData.searchBody[conditional];
  const response = await $firstCommonAPIClient.postRequest(url, this.postSearchData);
  $statusCode = response.status;
  this.totalRecordCount = response.data.meta.totalRecordCount;
  this.responseBodyItems = response.data.items;
});

When(/^Send a POST request to drug entity with '(.*)' search body$/, async (conditional) => {
  const url = searchEntityEndpoint('drug');
  this.postSearchData = drugSearchData.searchBody[conditional];
  const response = await $firstCommonAPIClient.postRequest(url, this.postSearchData);
  $statusCode = response.status;
  this.totalRecordCount = response.data.meta.totalRecordCount;
  this.responseBodyItems = response.data.items;
});

When(/^Send a POST request to organization entity with '(.*)' search body$/, async (conditional) => {
  const url = searchEntityEndpoint('organization ');
  this.postSearchData = organizationSearchData.searchBody[conditional];
  const response = await $firstCommonAPIClient.postRequest(url, this.postSearchData);
  $statusCode = response.status;
  this.totalRecordCount = response.data.meta.totalRecordCount;
  this.responseBodyItems = response.data.items;
});

Then(/^Check that the number of elements in the search result is greater than zero$/, async () => {
  expectChai(this.totalRecordCount).to.be.gt(0, "Total record count should be greater than zero");
});

Then(/^Check the result for '(.*)' simple search body in the response body$/, async (conditional) => {
  switch (conditional) {
    case "Is":
      const isKey = this.postSearchData.Is.name;
      const isStartValue = this.postSearchData.Is.value;
      expectChai(this.responseBodyItems).to.be.an(arrayTypeValue, "Response items should be an array.");
      expectChai(this.responseBodyItems).to.have.all.property(isKey, isStartValue, `The values for the key [${isKey}] should be the same for the value - [${isStartValue}]`);
      break;
    case "IsNot":
      const isNotKey = this.postSearchData.IsNot.name;
      const isNotStartValue = this.postSearchData.IsNot.value;
      expectChai(this.responseBodyItems).to.be.an(arrayTypeValue, "Response items should be an array.");
      expectChai(this.responseBodyItems, `All items should have this key - [${isNotKey}]`).to.have.all.property(isNotKey);
      expectChai(this.responseBodyItems).to.not.have.all.property(isNotKey, isNotStartValue, `The values for the key [${isNotKey}] should not be equal to the value - [${isNotStartValue}]`);
      break;
    case "IsOnly":
      const isOnlyKey = this.postSearchData.IsOnly.name;
      const isOnlyStartValue = this.postSearchData.IsOnly.value;
      expectChai(this.responseBodyItems).to.be.an(arrayTypeValue, "Response items should be an array.");
      const tempArray = [];
      tempArray.push(isOnlyStartValue);
      expectChai(this.responseBodyItems).to.have.all.deep.property(isOnlyKey, tempArray, `The values for the key [${isOnlyKey}] should be the same for the value - [${tempArray}]`);
      break;
    case "GreaterThan":
      const gtKey = this.postSearchData.gt.name;
      const gtStartValue = this.postSearchData.gt.value;
      expectChai(this.responseBodyItems).to.be.an(arrayTypeValue, "Response items should be an array.");
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${gtKey}]`).to.have.all.property(gtKey);
      const gtValueArrayByKey = this.responseBodyItems.map(a => a[`${gtKey}`]);
      expectChai(gtValueArrayByKey).all.be.gt(gtStartValue, `The values for the key [${gtKey}] should be the greater then for the value - [${gtStartValue}]`);
      break;
    case "GreaterThanOrEqualTo":
      const gteKey = this.postSearchData.gte.name;
      const gteStartValue = this.postSearchData.gte.value;
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${gteKey}]`).to.have.all.property(gteKey);
      const gteValueArrayByKey = this.responseBodyItems.map(a => a[`${gteKey}`]);
      expectChai(gteValueArrayByKey).all.be.gte(gteStartValue, `The values for the key [${gteKey}] should be the greater or equal then for the value - [${gteStartValue}]`);
      break;
    case "LessThan":
      const ltKey = this.postSearchData.lt.name;
      const ltStartValue = this.postSearchData.lt.value;
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${ltKey}]`).to.have.all.property(ltKey);
      const ltValueArrayByKey = this.responseBodyItems.map(a => a[`${ltKey}`]);
      expectChai(ltValueArrayByKey).all.be.lt(ltStartValue, `The values for the key [${ltKey}] should be the less then for the value - [${ltStartValue}]`);
      break;
    case "LessThanOrEqualTo":
      const lteKey = this.postSearchData.lte.name;
      const lteStartValue = this.postSearchData.lte.value;
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${lteKey}]`).to.have.all.property(lteKey);
      const lteValueArrayByKey = this.responseBodyItems.map(a => a[`${lteKey}`]);
      expectChai(lteValueArrayByKey).all.be.lte(lteStartValue, `The values for the key [${lteKey}] should be the less or equal then for the value - [${lteStartValue}]`);
      break;
    case "Between":
      const btwKey = this.postSearchData.between.name;
      const btwFrom = this.postSearchData.between.from;
      const btwTo = this.postSearchData.between.to;
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${btwKey}]`).to.have.all.property(btwKey);
      const btwValueArrayByKey = this.responseBodyItems.map(a => a[`${btwKey}`]);
      expectChai(btwValueArrayByKey ).all.be.gte(btwFrom, `The values for the key [${btwKey}] should be the greater or equal then for the value - [${btwFrom}]`);
      expectChai(btwValueArrayByKey ).all.be.lte(btwTo, `The values for the key [${btwKey}] should be the less or equal then for the value - [${btwTo}]`);
      break;
    case "Contains":
      const containsKey = this.postSearchData.contains.name;
      const containsValue = deleteWildcardSearchingSymbol(this.postSearchData.contains.value);
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${containsKey}]`).to.have.all.property(containsKey);
      const containsValueArrayByKey = this.responseBodyItems.map(a => a[`${containsKey}`].toLowerCase());
      expectChai(containsValueArrayByKey).all.to.have.string(containsValue.toLowerCase(), `The values for the key [${containsKey}] should contain the value - lowercase [${containsValue}]`);
      break;
    case "NotContains":
      const notContainsKey = this.postSearchData.notcontains.name;
      const notContainsValue = deleteWildcardSearchingSymbol(this.postSearchData.notcontains.value);
      expectChai(this.responseBodyItems, `All objects in the array should have the following key - [${notContainsKey}]`).to.have.all.property(notContainsKey);
      const notContainsValueArrayByKey = this.responseBodyItems.map(a => a[`${notContainsKey}`].toLowerCase());
      expectChai(notContainsValueArrayByKey).all.to.not.include(notContainsValue.toLowerCase(), `The values for the key [${notContainsKey}]  should not contain the value - lowercase [${notContainsValue}]`);
      break;
    default:
      expectChai.fail(`This conditional [${conditional}] is not supported.`);
      break;
  }
});


function deleteWildcardSearchingSymbol(str)
{
  return str.replace('*', "");
}