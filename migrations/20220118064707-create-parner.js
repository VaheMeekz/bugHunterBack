'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      businessAdress:{
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING
      },
      webSite: {
        type: Sequelize.STRING
      },
      country:{
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parners');
  }
};