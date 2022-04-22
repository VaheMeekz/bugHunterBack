"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Reports, {
        foreignKey: "user_id",
        as: "Reports",
      }),
        User.hasOne(models.Avatar, {
          foreignKey: "user_id",
          as: "Avatar",
        }),
        User.belongsTo(models.Clan, {
          foreignKey: "clanId",
          as: "Clan",
        });
      User.belongsTo(models.Clan, {
        foreignKey: "creatorClanId",
        as: "CreatedClan",
      });
      User.hasMany(models.Chat, {
        foreignKey: "user_uuid",
        as: "Chats",
      });
      User.hasMany(models.Message, {
        foreignKey: "reciver",
        as: "msg",
      });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      token: DataTypes.STRING,
      userClass: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "hacker",
      },
      rewards: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      vulnerabilitiesFound: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalBountiesPaid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      averageBounty: {
        type: DataTypes.STRING,
      },
      topBountyRange: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.STRING,
      },
      clanId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      creatorClanId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      ClanOficer: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "none",
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      about: {
        type: DataTypes.STRING(1234),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        defaultValue: "Add Your Website URL",
      },
      git: {
        type: DataTypes.STRING,
        defaultValue: "Missing",
      },
      insta: {
        type: DataTypes.STRING,
        defaultValue: "Missing",
      },
      twwiter: {
        type: DataTypes.STRING,
        defaultValue: "Missing",
      },
      query: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  let Messages = sequelize.define("Message");
  // User.hasMany(Messages, {
  //   foreignKey: "reciver",
  //   as: "message",
  // });

  return User;
};
