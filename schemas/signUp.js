const signupSchema = {
  type: 'object',
  properties: {
    user_name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    user_type: { type: 'string', enum: ['superuser', 'subuser'] },
    is_verified: { type: 'boolean' },
    user_role: { type: 'string' },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['user_name', 'email', 'password', 'user_type', 'is_verified', 'user_role'],
  additionalProperties: false
};

module.exports = signupSchema;




