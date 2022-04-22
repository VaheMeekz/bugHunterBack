'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lang.init({
    selector: DataTypes.STRING,
    langEng: DataTypes.STRING(1234),
    langRu: DataTypes.STRING,
    langArm: DataTypes.STRING,
    page: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lang',
  });
  return Lang;
};