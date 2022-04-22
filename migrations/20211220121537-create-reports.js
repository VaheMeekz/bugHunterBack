'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asset: {
        type: Sequelize.STRING
      },
      weakness: {
        type: Sequelize.STRING
      },
      severity: {
        type: Sequelize.STRING
      },
      creator:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1234)
      },
      additionlInfo: {
        type: Sequelize.STRING(1234)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      program_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("new", "accept", "rejected","retest"),
        defaultValue:'new'
      },
      like:{
        type:Sequelize.INTEGER,
        defaultValue:0
      },
      creatorAvatar:{
        type:Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};