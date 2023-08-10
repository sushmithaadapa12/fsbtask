'use strict';
const {DataTypes} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions',{
      permission_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      super_admin_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'superuser',
          key: 'user_id',
        },
      },
      sub_admin_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'subuser',
          key: 'subuser_id',
        },
      },
      can_create_job: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');
  }
};
