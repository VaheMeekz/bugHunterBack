'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationPaid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  OrganizationPaid.init({
    orgId: DataTypes.INTEGER,
    value:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId:DataTypes.INTEGER,
    userName:{
      type:DataTypes.STRING
    },
    userAvatar:{
      type:DataTypes.STRING
    },
    programId:DataTypes.INTEGER,
    programName:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrganizationPaid',
  });
  return OrganizationPaid;
};