const feedEntityEndpoint = (entity) => `/v1/feed/${entity}`;
const feedEntityCountEndpoint = (entity) => `${feedEntityEndpoint(entity)}/count`;
const searchEntityByIdEndpoint = (entity, id) => `/v1/search/${entity}?${entity}id=${id}`;
const feedEntityEndpointPagesizeQuery = (entity, pageSize) => `/v1/feed/${entity}?pagesize=${pageSize}`;
const feedEntityEndpointFieldsQuery = (entity, fieldsArray) => `/v1/feed/${entity}?fields=${fieldsArray}`;
const authTokenEndpoint = "connect/token";

const searchEntityEndpoint = (entity) => `/v1/search/${entity}`;

module.exports = {
  feedEntityEndpoint,
  feedEntityCountEndpoint,
  searchEntityByIdEndpoint,
  feedEntityEndpointPagesizeQuery,
  feedEntityEndpointFieldsQuery,
  authTokenEndpoint,
  searchEntityEndpoint,
};
