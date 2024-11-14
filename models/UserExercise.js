'use strict';
const {
  Model
} = require('sequelize');

async function updateProgressPercentage(userId, moduleId) {
  const { Progress, UserExercise, Exercise } = require('../models');

  const totalExercises = await Exercise.count({ where: { moduleId } });
  const completedExercises = await UserExercise.count({
    where: { userId },
    include: {
      model: Exercise,
      where: { moduleId }
    }
  });

  const progressPercentage = (completedExercises / totalExercises) * 100;

  const progressRecord = await Progress.findOne({ where: { userId, moduleId } });

  if (progressRecord) {
    await progressRecord.update({ progressPercentage: progressPercentage || 0 });
  } else {
    await Progress.create({
      userId,
      moduleId,
      progressPercentage: progressPercentage || 0
    });
  }
}


module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a UserExercise.
   * @extends Model
   */
  class UserExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @static
     * @param {object} models - The models used for association.
     */
    static associate(models) {
      // define association here
      /**
       * A user exercise belongs to a user.
       * @memberof UserExercise
       */
      UserExercise.belongsTo(models.User, { foreignKey: 'userId' });
      /**
       * A user exercise belongs to an exercise.
       * @memberof UserExercise
       */
      UserExercise.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }

  /**
   * Initializes the UserExercise model with its attributes and options.
   * @memberof UserExercise
   * @param {object} sequelize - The Sequelize instance.
   * @param {object} DataTypes - An object containing Sequelize data types.
   * @returns {UserExercise} The initialized UserExercise model.
   */
  UserExercise.init({
    /**
     * The ID of the related user.
     * @type {number}
     * @memberof UserExercise
     * @instance
     * @property {number} userId - The ID of the related user.
     */
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    /**
     * The ID of the related exercise.
     * @type {number}
     * @memberof UserExercise
     * @instance
     * @property {number} exerciseId - The ID of the related exercise.
     */
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserExercise',
    hooks: {
      async afterCreate(userExercise, options) {
        console.log("Hook afterCreate triggered");
        const exercise = await sequelize.models.Exercise.findByPk(userExercise.exerciseId);
        console.log("Ejercicio obtenido en afterCreate:", exercise);
     
        if (exercise && exercise.moduleId) {
          console.log("Ejecutando updateProgressPercentage");
          await updateProgressPercentage(userExercise.userId, exercise.moduleId);
        } else {
          console.log("No se pudo obtener el moduleId del ejercicio.");
        }
      },
      async afterDestroy(userExercise, options) {
        const exercise = await sequelize.models.Exercise.findByPk(userExercise.exerciseId);
        if (exercise && exercise.moduleId) {
          await updateProgressPercentage(userExercise.userId, exercise.moduleId);
        }
      }
    }
  });

  return UserExercise;
};