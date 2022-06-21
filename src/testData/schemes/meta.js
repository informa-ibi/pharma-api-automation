const jsonSchemaForMetaSection = {
    type: "object",
    properties: {
        meta: {
        type: "object",
        properties: {
            statusCode:  { type: 'number' },
            message: { type: 'string' },
            version: { type: 'string' },
            schemaVersion: { type: 'string' },
            generated: { type: 'string' },
            queryUrl: { type: 'string' },
        },
        required: [
            'statusCode', 
            'message', 
            'version',
            'schemaVersion',
            'generated',
            'queryUrl'
          ],additionalProperties: false
        },
    },
    required: ["meta"],
    additionalProperties: true
}

module.exports = {
    jsonSchemaForMetaSection
  };