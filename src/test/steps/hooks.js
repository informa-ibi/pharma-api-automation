const env = require("../../environment/api");
const timeouts = require("../../constants/timeouts");
const APIUtils = require("informa_framework").utils.APIUtils;
const PostgresUtil = require("informa_framework").utils.PostgresUtils;
const configDB = require("../../environment/PGDataBase").postGresDbConfig;
const endpoints = require("../../constants/apiEndpoints");
const headers = require("../../constants/headers");

const { setDefaultTimeout, After, Before, BeforeAll, AfterAll } = require("@cucumber/cucumber");

setDefaultTimeout(timeouts.defaultCucumberTime);

BeforeAll(async () => {
  $authCommonAPIClient = new APIUtils(env.identityUrl.url);
  const data = {
    grant_type: `${env.identityUrl.grant_type}`,
    scope: `${env.identityUrl.scope}`,
    username: `${env.identityUrl.username}`,
    password: `${env.identityUrl.password}`,
  };

  const params = APIUtils.convert_x_www_form_urlencoded_toString(data);
  const login_config = { timeout: 10000, headers: { Authorization: `Basic ${env.identityUrl.basicAuthToken}` } };
  const response = await $authCommonAPIClient.postRequest(endpoints.authTokenEndpoint, params, login_config);
  const access_token = await response.data.access_token;

  $commonAuthHeader = { Authorization: `Bearer ${access_token}` };
  $firstCommonAPIClient = new APIUtils(env.hostUrl, $commonAuthHeader);
  $xmlCommonAPIClient = new APIUtils(env.hostUrl, { ...$commonAuthHeader, ...headers.xmlHeaders });

  await PostgresUtil.initConnection(configDB);
});

AfterAll(async () => {
  await PostgresUtil.close();
});
