'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.hasMany(models.Exercise, { foreignKey: 'moduleId' });
      Module.hasMany(models.Theory, { foreignKey: 'moduleId' });
      Module.hasMany(models.Progress, { foreignKey: 'moduleId' });
    }
  }
  Module.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};