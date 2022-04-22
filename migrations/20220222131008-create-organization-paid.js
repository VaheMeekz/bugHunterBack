'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrganizationPaids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orgId: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: Sequelize.INTEGER,
      userName: {
        type: Sequelize.STRING,
      },
      userAvatar: {
        type: Sequelize.STRING,
      },
      programId: Sequelize.INTEGER,
      programName: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrganizationPaids')
  },
}
