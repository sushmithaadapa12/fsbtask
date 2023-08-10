'use strict';
const {DataTypes} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subUser',{
      subuser_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
      super_user_id: {
        type: DataTypes.UUID,  // Assuming UUID is used as primary key in superUser table
        allowNull: false,
        references: {
          model: 'superuser',
          key: 'user_id',
        },
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subUser');
  }
};
