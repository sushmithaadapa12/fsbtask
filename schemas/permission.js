const assignPermissionsSchema = {
    type: 'object',
    properties: {
      subuser_id: { type: 'string', format: 'uuid' },
      super_user_id: { type: 'string', format: 'uuid' },
      can_create_job: { type: 'boolean' },
    },
    required: ['subuser_id', 'super_user_id'],
};
module.exports = assignPermissionsSchema;