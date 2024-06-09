'use strict';
const {
  Model
} = require('sequelize');

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
  });

  return UserExercise;
};