const { When, Then } = require("@cucumber/cucumber");
const expectChai = require("chai").expect;
const entities = require("../../constants/entities").entities;
const feedEntityCountEndpoint = require("../../constants/apiEndpoints").feedEntityCountEndpoint;
const PostgresUtil = require("informa_framework").utils.PostgresUtils;
const dbName = require("../../environment/PGDataBase").postGresDbConfig.dbName;
const commonQuery = require("../../testData/postgreSqlQueries").commonQuery;
const getRowsCountFromTable = require("../../testData/postgreSqlQueries").getRowsCountFromTable;
const utils = require("../../util/commonUtils");

const maximumDifferenceBetweenValuesInPercent = 1;

When(/^Send request to '(.*)' entity count endpoint$/, async (entity) => {
  const url = feedEntityCountEndpoint(entities[entity]);
  const response = await $firstCommonAPIClient.getRequest(url);
  $statusCode = response.status;
  this.dataCount = response.data.data.count;
});

When(/^Get the number of records for an '(.*)' entity from the PG database$/, async (entity) => {
  const databaseQuery = utils.replaceTheLineBreakCharactersWithASpace(getRowsCountFromTable(commonQuery[entity]));
  const resultFromDatabase = await PostgresUtil.query(dbName, databaseQuery);
  this.expectedCountFromDB = parseInt(resultFromDatabase.rows[0].count);
});

Then(/^The count of items in the API and database differs by no more than 1 percent for the entity - '(.*)'$/, async (entity) => {
  expectChai(utils.getThePercentageDifferenceBetween2Numbers(this.dataCount, this.expectedCountFromDB)).to.lessThanOrEqual(
    maximumDifferenceBetweenValuesInPercent,
    `Count of items for the response API for ${entity} and their number in the database should not differ more than ${maximumDifferenceBetweenValuesInPercent} percent`
  );
});
