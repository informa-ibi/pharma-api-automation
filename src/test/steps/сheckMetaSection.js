const { Then } = require("@cucumber/cucumber");
const chai = require("chai");
const expectChai = chai.expect;
chai.use(require("chai-json-schema-ajv"));
const { jsonSchemaForMetaSection } = require("../../testData/schemes/meta");

Then(/^Check that the META section in the response has the correct json schema$/, async () => {
  expectChai($feedResponseBody).to.be.jsonSchema(jsonSchemaForMetaSection, "The meta section in the response should have the correct json schema");
});
