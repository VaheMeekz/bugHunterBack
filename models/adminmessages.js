'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminMessages.init({
    reciverId: DataTypes.INTEGER,
    message: DataTypes.STRING(1234)
  }, {
    sequelize,
    modelName: 'AdminMessages',
  });
  return AdminMessages;
};