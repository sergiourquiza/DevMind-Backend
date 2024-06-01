'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.Module, { foreignKey: 'moduleId' });
      Exercise.belongsTo(models.Difficulty, { foreignKey: 'difficultyId' });

      Exercise.hasMany(models.Answer, { foreignKey: 'exerciseId' });
      Exercise.hasMany(models.UserExercise, { foreignKey: 'exerciseId' });
    }
  }
  Exercise.init({
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    difficultyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};