const addAuditionsSchema = {
    type: 'object',
    properties: {
      jobPublicId: { type: 'string', minLength: 1 },
      auditions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            from_date: { type: 'string', format: 'date-time' },
            to_date: { type: 'string', format: 'date-time' },
            audition_location: { type: 'string', minLength: 1 },
          },
          required: ['from_date', 'to_date', 'audition_location'],
        },
      },
    },
    required: ['jobPublicId', 'auditions'],
  };
  
  module.exports = addAuditionsSchema;
  