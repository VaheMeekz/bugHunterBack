'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hightPriorityTargets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  };
  hightPriorityTargets.init({
    category: DataTypes.STRING,
    url: DataTypes.STRING,
    program_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'hightPriorityTargets',
  });
  return hightPriorityTargets;
};