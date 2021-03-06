//TODO: The best way to add v1 for the parameters
const FEED_ENTITY_ENDPOINT = (entity) => `/v1/feed/${entity}`;
const FEED_ENTITY_COUNT_ENDPOINT = (entity) => `${FEED_ENTITY_ENDPOINT(entity)}/count`;
const SEARCH_ENTITY_BY_ID_ENDPOINT = (entity, id) => `/v1/search/${entity}?${entity}id=${id}`;
const FEED_ENTITY_ENDPOINT_PAGESIZE_QUERY = (entity, pageSize) => `/v1/feed/${entity}?pagesize=${pageSize}`;
const FEED_ENTITY_ENDPOINT_FIELDS_QUERY = (entity, fieldsArray) => `/v1/feed/${entity}?fields=${fieldsArray}`;
const FEED_ENTITY_ENDPOINT_CHANGES_SINCE_QUERY = (entity, sinceData) => `/v1/feed/${entity}/changes?since=${sinceData}`;
const FEED_ENTITY_ENDPOINT_CHANGES_COUNT_SINCE_QUERY = (entity, sinceData) => `/v1/feed/${entity}/changes/count?since=${sinceData}`;
const FEED_ENTITY_ENDPOINT_CHANGES_SINCE_TYPE_QUERY = (entity, sinceData, type) => `/v1/feed/${entity}/changes/?since=${sinceData}&type=${type}`;
const SEARCH_ENTITY_LIST_ENDPOINT = (entity) => `/v1/search/${entity}/list`;
const SEARCH_ENTITY_LIST_PARAMETER_ENDPOINT = (entity, parameter) => `/v1/search/${entity}/list/${parameter}`;
const SEARCH_PARAMETER_ENDPOINT = (parameter, term) => `?${parameter}=${term}`;
const SORT_PARAMETER_ENDPOINT = (fieldName) => `&sort=${fieldName}`;
const ORDER_PARAMETER_ENDPOINT = (order) => `&order=${order}`;

const AUTH_TOKEN_ENDPOINT = "connect/token";

const SEARCH_ENTITY_ENDPOINT = (entity) => `/v1/search/${entity}`;

const ORDER_VALUES = {
  Asc: "Asc",
  Desc: "Desc",
};

module.exports = {
  FEED_ENTITY_ENDPOINT,
  FEED_ENTITY_COUNT_ENDPOINT,
  SEARCH_ENTITY_BY_ID_ENDPOINT,
  FEED_ENTITY_ENDPOINT_PAGESIZE_QUERY,
  FEED_ENTITY_ENDPOINT_FIELDS_QUERY,
  AUTH_TOKEN_ENDPOINT,
  SEARCH_ENTITY_ENDPOINT,
  FEED_ENTITY_ENDPOINT_CHANGES_SINCE_QUERY,
  FEED_ENTITY_ENDPOINT_CHANGES_COUNT_SINCE_QUERY,
  FEED_ENTITY_ENDPOINT_CHANGES_SINCE_TYPE_QUERY,
  SEARCH_ENTITY_LIST_ENDPOINT,
  SEARCH_ENTITY_LIST_PARAMETER_ENDPOINT,
  ORDER_VALUES,
  SEARCH_PARAMETER_ENDPOINT,
  SORT_PARAMETER_ENDPOINT,
  ORDER_PARAMETER_ENDPOINT
};
