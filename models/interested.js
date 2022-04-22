'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interested extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Interested.init({
    userId: DataTypes.INTEGER,
    programId: DataTypes.INTEGER,
    name:{
      type:DataTypes.STRING
    },
    programText:{
      type:DataTypes.STRING(1234)
    },
    minPrice:{
      type:DataTypes.STRING
    },
    maxPrice:{
      type:DataTypes.STRING
    },
    orgAvatar:{
      type:DataTypes.STRING
    }

  }, {
    sequelize,
    modelName: 'Interested',
  });
  return Interested;
};