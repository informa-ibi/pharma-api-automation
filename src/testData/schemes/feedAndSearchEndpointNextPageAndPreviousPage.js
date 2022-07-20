const metaForFeedEndpoint = {
  type: "object",
  properties: {
    statusCode: { type: "number" },
    message: { type: "string" },
    version: { type: "string" },
    schemaVersion: { type: "string" },
    generated: { type: "string" },
    queryUrl: { type: "string" },
  },
  required: ["statusCode", "message", "version", "schemaVersion", "generated", "queryUrl"],
  additionalProperties: false,
};

const metaForSearchEndpoint = {
  type: "object",
  properties: {
    statusCode: { type: "number" },
    message: { type: "string" },
    version: { type: "string" },
    schemaVersion: { type: "string" },
    generated: { type: "string" },
    queryUrl: { type: "string" },
    totalRecordCount: { type: "number" },
  },
  required: ["statusCode", "message", "version", "schemaVersion", "generated", "queryUrl", "totalRecordCount"],
  additionalProperties: false,
};

const nextPagePagination = {
  type: "object",
  properties: {
    nextPage: { type: "string" },
  },
  required: ["nextPage"],
  additionalProperties: false,
};

const previousPagePagination = {
  type: "object",
  properties: {
    previousPage: { type: "string" },
  },
  required: ["previousPage"],
  additionalProperties: false,
};

const nextAndPreviousPagePagination = {
  type: "object",
  properties: {
    nextPage: { type: "string" },
    previousPage: { type: "string" },
  },
  required: ["nextPage", "previousPage"],
  additionalProperties: false,
};

const feedEndpointDefaultJsonSchema = {
  type: "object",
  properties: {
    meta: metaForFeedEndpoint,
    pagination: nextPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true }, 
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const feedEndpointNextAndPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta: metaForFeedEndpoint,
    pagination: nextAndPreviousPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const feedEndpointPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta: metaForFeedEndpoint,
    pagination: previousPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const searchEndpointDefaultJsonSchema = {
  type: "object",
  properties: {
    meta: metaForSearchEndpoint,
    pagination: nextPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const searchEndpointNextAndPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta: metaForSearchEndpoint,
    pagination: nextAndPreviousPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const searchEndpointPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta: metaForSearchEndpoint,
    pagination: previousPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

module.exports = {
  feedEndpointDefaultJsonSchema,
  feedEndpointNextAndPreviousPagePaginationJsonSchema,
  feedEndpointPreviousPagePaginationJsonSchema,
  searchEndpointDefaultJsonSchema,
  searchEndpointNextAndPreviousPagePaginationJsonSchema,
  searchEndpointPreviousPagePaginationJsonSchema,
};
