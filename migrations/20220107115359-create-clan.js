'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clanId: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      score:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
       clanAvatar:{
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      about:{
        type:Sequelize.STRING(1234)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clans');
  }
};