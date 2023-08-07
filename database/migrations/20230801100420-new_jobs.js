'use strict';
const {DataTypes} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('job',{
      public_id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false 
      },
      jobname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobstatus: {
        type: DataTypes.ENUM('draft', 'publish'),
        allowNull: false,
      },
      submissiondeadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      projectspecifications: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      budget: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      productionclientName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('job');
  }
};
