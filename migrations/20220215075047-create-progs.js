"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Progs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: Sequelize.STRING,
      about: Sequelize.STRING(1234),
      progText: Sequelize.STRING(1234),
      minPrice: Sequelize.INTEGER,
      maxPrice: Sequelize.INTEGER,
      creatorId: Sequelize.INTEGER,
      minTargetsLow: Sequelize.STRING,
      maxTargetsLow: Sequelize.STRING,
      minHightTargetsLow: Sequelize.STRING,
      maxHightTargetsLow: Sequelize.STRING,

      minTargetsMedium: Sequelize.STRING,
      maxTargetsMedium: Sequelize.STRING,
      minHightTargetsMedium: Sequelize.STRING,
      maxHightTargetsMedium: Sequelize.STRING,

      minTargetsHight: Sequelize.STRING,
      maxTargetsHight: Sequelize.STRING,
      minHightTargetsHight: Sequelize.STRING,
      maxHightTargetsHight: Sequelize.STRING,
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
    await queryInterface.dropTable("Progs");
  },
};
