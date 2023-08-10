const subAccountSchema = {
    type: 'object',
    properties: {
      user_name: { type: 'string',minLength: 1 },
      email: { type: 'string', format: 'email' },
      is_verified: { type: 'boolean' },
      super_user_id: { type: 'string', format: 'uuid' },
    },
    required: ['user_name', 'email', 'is_verified', 'super_user_id'],
};
module.exports = subAccountSchema;