"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Retests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      programId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "new",
      },
      name: {
        type: Sequelize.STRING,
      },
      programText: {
        type: Sequelize.STRING(1234),
      },
      minPrice: {
        type: Sequelize.STRING,
      },
      maxPrice: {
        type: Sequelize.STRING,
      },
       creator:{
      type:Sequelize.INTEGER
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Retests");
  },
};
