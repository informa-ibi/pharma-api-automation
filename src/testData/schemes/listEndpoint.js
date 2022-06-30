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

const pagination = {
  type: "object",
  properties: {
    nextPage: { type: "string" },
  },
  required: ["nextPage"],
  additionalProperties: false,
};

const innerSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: ["id", "name"],
  additionalProperties: false,
};

const items = {
  type: "array",
  items: innerSchema,
  minItems: 1,
};

const jsonSchemaForListParameterResponse = {
  type: "object",
  properties: {
    meta,
    pagination,
    items,
  },
  required: ["meta", "pagination", "items"],
  additionalProperties: false,
};

const jsonSchemaForListResponse = {
  type: "object",
  properties: {
    meta,
    items: { type: "array", minItems: 1, uniqueItems: true },
  },
  required: ["meta", "items"],
  additionalProperties: false,
};

module.exports = {
  jsonSchemaForListParameterResponse,
  jsonSchemaForListResponse,
};
