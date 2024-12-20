'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing an Exercise.
   * @extends Model
   */
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @static
     * @param {object} models - The models used for association.
     */
    static associate(models) {
      /**
       * Define a many-to-one relationship with the Module model.
       * @memberof Exercise
       */
      Exercise.belongsTo(models.Module, { foreignKey: 'moduleId' });
      
      /**
       * Define a many-to-one relationship with the Difficulty model.
       * @memberof Exercise
       */
      Exercise.belongsTo(models.Difficulty, { foreignKey: 'difficultyId' });

      /**
       * Define a one-to-many relationship with the Answer model.
       * @memberof Exercise
       */
      Exercise.hasMany(models.Answer, { foreignKey: 'exerciseId' });

      /**
       * Define a one-to-many relationship with the UserExercise model.
       * @memberof Exercise
       */
      Exercise.hasMany(models.UserExercise, { foreignKey: 'exerciseId' });

      /**
       * Define a one-to-many relationship with the Input model.
       * @memberof Exercise
       */
      Exercise.hasMany(models.Input, { foreignKey: 'exerciseId' });
    }
  }

  /**
   * Initialize the Exercise model.
   * @memberof Exercise
   * @param {object} sequelize - The sequelize instance.
   * @param {object} DataTypes - The data types for Sequelize.
   * @returns {Exercise} The initialized Exercise model.
   */
  Exercise.init({
    /**
     * The ID of the related module.
     * @type {number}
     * @memberof Exercise
     * @instance
     * @property {number} moduleId - The ID of the related module.
     */
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    /**
     * The ID of the related difficulty level.
     * @type {number}
     * @memberof Exercise
     * @instance
     * @property {number} difficultyId - The ID of the related difficulty level.
     */
    difficultyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    /**
     * The description of the exercise.
     * @type {string}
     * @memberof Exercise
     * @instance
     * @property {string} description - The description of the exercise.
     */
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    /**
     * Validate if the exercise requires inputs.
     * @type {boolean}
     * @memberof Exercise
     * @instance
     * @property {boolean} requiresInput - Validate if the exercise requires inputs.
     */
    requiresInput: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    /**
     * The code type of the exercise.
     * @type {string}
     * @memberof Exercise
     * @instance
     * @property {string} codeType - The code type of the exercise.
     */
    codeType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'script'
    },

    /**
     * The function name of the exercise.
     * @type {string}
     * @memberof Exercise
     * @instance
     * @property {string} functionName - The function name of the exercise.
     */
    functionName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Exercise',
  });

  return Exercise;
};