'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Theory.belongsTo(models.Module, { foreignKey: 'moduleId' });
    }
  }
  Theory.init({
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Theory',
  });
  return Theory;
};