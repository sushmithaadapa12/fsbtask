const updateSchema = {
    type: 'object',
    properties: {
      jobStatus: {
        type: 'string',
        enum: ['draft', 'publish'],
      },
    },
    required: [ 'jobStatus'],
}

module.exports = updateSchema;