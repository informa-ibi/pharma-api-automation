const { generate } = require("cucumber-html-reporter");
const { type } = require("os");
const ENVIRONMENT = process.env.ENVIRONMENT || "prod";

const options = {
  theme: "bootstrap",
  jsonFile: "./report/report.json",
  output: "./report/report.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  name: "Pharma API automation",
  brandTitle: "Automation of API requests",
  metadata: {
    "App Version": "V1",
    "Test Environment": ENVIRONMENT,
    Platform: `${type()}`,
    Parallel: "Scenarios",
    Executed: "Remote",
  },
};

generate(options);
