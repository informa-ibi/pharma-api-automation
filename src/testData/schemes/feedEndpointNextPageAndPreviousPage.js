//TODO: Add feed meta section and search meta section
const meta = {
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
    meta,
    pagination: nextPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true }, //  items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const feedEndpointNextAndPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta,
    pagination: nextAndPreviousPagePagination,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const feedEndpointPreviousPagePaginationJsonSchema = {
  type: "object",
  properties: {
    meta,
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
};
