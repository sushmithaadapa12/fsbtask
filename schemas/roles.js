const addRolesSchema = {
    type: 'object',
    properties: {
      jobPublicId: { type: 'string', minLength: 1 },
      roles: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ratesperunitoftime: { type: 'number', minimum: 0 },
            agency_fee_checked: { type: 'boolean' },
            // Add other role properties here
          },
          required: ['ratesperunitoftime', 'agency_fee_checked'],
        },
      },
    },
    required: ['jobPublicId', 'roles'],
  };
  
  module.exports = addRolesSchema;