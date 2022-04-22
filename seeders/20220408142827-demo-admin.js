("use strict");

const data = require('../utils/data')
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Admins",data)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
