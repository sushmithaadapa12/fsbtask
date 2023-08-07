'use strict';
const {DataTypes} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles',{
      public_id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false 
      },
      job_production_id: { type: DataTypes.UUID, allowNull: false,
      references: {
          model: 'job',
          key: 'public_id'
      } },
      ratesPerUnitOfTime: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      agencyFee: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      agencyFeePercentage: {
          type: DataTypes.FLOAT,
      },
      recallFees: {
          type: DataTypes.FLOAT,
      },
      travel: {
          type: DataTypes.FLOAT,
      },
      accommodation: {
          type: DataTypes.FLOAT,
      },
      expenses: {
          type: DataTypes.FLOAT,
      },
      usageFee: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      gender: {
          type: DataTypes.ENUM('Male', 'Female', 'Non-Binary', 'Trans male', 'Trans female'),
      },
      playingAgeStart: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      playingAgeEnd: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      ageRequirement: {
          type: DataTypes.ENUM('18+', '21+'),
      },
      childLicenseRequired: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      nudityClause: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      sensitiveContentMessage: {
          type: DataTypes.TEXT,
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
    await queryInterface.dropTable('roles');
  }
};
