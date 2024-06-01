'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Progress.belongsTo(models.User, { foreignKey: 'userId' });
      Progress.belongsTo(models.Module, { foreignKey: 'moduleId' });
    }
  }
  Progress.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    progressPercentage: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Progress',
  });
  return Progress;
};