'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserExercise.belongsTo(models.User, { foreignKey: 'userId' });
      UserExercise.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }
  UserExercise.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserExercise',
  });
  return UserExercise;
};