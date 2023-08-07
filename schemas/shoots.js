const addShootsSchema = {
    type: 'object',
    properties: {
      jobPublicId: { type: 'string', minLength: 1 },
      shoots: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            from_date: { type: 'string', format: 'date-time' },
            to_date: { type: 'string', format: 'date-time' },
            shoot_location: { type: 'string', minLength: 1 },
          },
          required: ['from_date', 'to_date', 'shoot_location'],
        },
      },
    },
    required: ['jobPublicId', 'shoots'],
  };
  
  module.exports = addShootsSchema;