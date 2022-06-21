const env = process.env.ENVIRONMENT || "prod";

const IdentityUrl = {
  dev: {
    url: "https://identity.dev.citeline-fos.informa-labs.com/",
    basicAuthToken: process.env.devBasicAuthToken,
    grant_type: "password",
    scope: "customer-api",
    username: process.env.devUsername,
    password: process.env.devPassword,
  },
  prod: {
    url: "https://identity.pharmaintelligence.informa.com",
    basicAuthToken:
      process.env.prodBasicAuthToken,
    grant_type: "password",
    scope: "customer-api",
    username: process.env.prodUsername,
    password: process.env.prodPassword,
  },
};

const HostUrl = {
  dev: "https://api-dev.capi.informa-labs.com",
  prod: "https://api.pharmaintelligence.informa.com",
};

module.exports = {
  identityUrl: IdentityUrl[env],
  hostUrl: HostUrl[env],
};
