'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('job',{
      
    })
  },

  async down (queryInterface, Sequelize) {
   
  }
};
