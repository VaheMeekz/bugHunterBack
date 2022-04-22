"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Progs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Progs.init(
    {
      name: DataTypes.STRING,
      about: DataTypes.STRING(1234),
      progText: DataTypes.STRING(1234),
      minPrice: DataTypes.INTEGER,
      maxPrice: DataTypes.INTEGER,
      creatorId: DataTypes.INTEGER,

      minTargetsLow: DataTypes.STRING,
      maxTargetsLow: DataTypes.STRING,
      minHightTargetsLow: DataTypes.STRING,
      maxHightTargetsLow: DataTypes.STRING,

      minTargetsMedium: DataTypes.STRING,
      maxTargetsMedium: DataTypes.STRING,
      minHightTargetsMedium: DataTypes.STRING,
      maxHightTargetsMedium: DataTypes.STRING,

      minTargetsHight: DataTypes.STRING,
      maxTargetsHight: DataTypes.STRING,
      minHightTargetsHight: DataTypes.STRING,
      maxHightTargetsHight: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Progs",
    }
  );
  return Progs;
};
