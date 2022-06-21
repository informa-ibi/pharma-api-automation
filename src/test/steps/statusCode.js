const { Then } = require("@cucumber/cucumber");
const { StatusCodes } = require("http-status-codes");
const expectChai = require("chai").expect;

Then(/^The API status code should be '(.*)' $/, async (statusCode) => {
  expectChai($statusCode).to.equal(parseInt(statusCode), "The status code should be correct");
});

Then(/^The API status code should be 200 - OK$/, async () => {
  expectChai($statusCode).to.equal(StatusCodes.OK, "The status code should be correct");
});
