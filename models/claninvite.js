'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClanInvite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClanInvite.init({
    creatorId: DataTypes.INTEGER,
    inviteUserId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    clanName:DataTypes.STRING,
    creatorName:DataTypes.STRING,
    clanAvatar:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ClanInvite',
  });
  return ClanInvite;
};