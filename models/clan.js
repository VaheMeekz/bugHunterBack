"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clan.hasMany(models.User, {
        foreignKey: "clanId",
        as: "Users",
      }),
        Clan.hasOne(models.User, {
          foreignKey: "creatorClanId",
          as: "Creator",
        });
    }
  }
  Clan.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clanId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      clanAvatar:{
        type: DataTypes.STRING,
      },
      about:{
        type:DataTypes.STRING(1234)
      }
    },
    {
      sequelize,
      modelName: "Clan",
    }
  );
  return Clan;
};
