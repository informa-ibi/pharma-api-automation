const env = require("../../environment/api");
const { DEFAULT_CUCUMBER_TIME } = require("../../constants/timeouts");
const APIUtils = require("informa_framework").utils.APIUtils;
const PostgresUtil = require("informa_framework").utils.PostgresUtils;
const configDB = require("../../environment/PGDataBase").postGresDbConfig;
const { AUTH_TOKEN_ENDPOINT } = require("../../constants/apiEndpoints");
const { XML_HEADERS } = require("../../constants/headers");

const { setDefaultTimeout, After, Before, BeforeAll, AfterAll } = require("@cucumber/cucumber");

setDefaultTimeout(DEFAULT_CUCUMBER_TIME);

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
  const response = await $authCommonAPIClient.postRequest(AUTH_TOKEN_ENDPOINT, params, login_config);
  const access_token = await response.data.access_token;

  $commonAuthHeader = { Authorization: `Bearer ${access_token}` };
  $firstCommonAPIClient = new APIUtils(env.hostUrl, $commonAuthHeader);
  $xmlCommonAPIClient = new APIUtils(env.hostUrl, { ...$commonAuthHeader, ...XML_HEADERS });

  await PostgresUtil.initConnection(configDB);
});

AfterAll(async () => {
  await PostgresUtil.close();
});
