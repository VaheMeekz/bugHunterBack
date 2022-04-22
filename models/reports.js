"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reports.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
      });
    }
  }
  Reports.init(
    {
      asset: DataTypes.STRING,
      weakness: DataTypes.STRING,
      severity: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING(1234),
      additionlInfo: DataTypes.STRING(1234),
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creator:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("new", "accept", "rejected","retest"),
        defaultValue:'new'
      },
      like:{
        type:DataTypes.INTEGER,
        defaultValue:0
      },
      creatorAvatar:{
        type:DataTypes.STRING
      }

    },
    {
      sequelize,
      modelName: "Reports",
    }
  );
  return Reports;
};
