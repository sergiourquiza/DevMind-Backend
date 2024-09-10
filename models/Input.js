'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing an Input.
   * @extends Model
   */
  class Input extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /**
       * Define a many-to-one relationship with the Exercise model.
       * @memberof Input
       */
      Input.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }

  /**
   * Initialize the Input model.
   * @memberof Input
   * @param {object} sequelize - The sequelize instance.
   * @param {object} DataTypes - The data types for Sequelize.
   * @returns {Input} The initialized Input model.
   */
  Input.init({
    /**
     * The ID of the related exercise.
     * @type {number}
     * @memberof Input
     * @instance
     * @property {number} exerciseId - The ID of the related exercise.
     */
    exerciseId: DataTypes.INTEGER,
    
    /**
     * The input of the exercise.
     * @type {string}
     * @memberof Input
     * @instance
     * @property {string} input - The input of the exercise.
     */
    input: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Input',
  });
  return Input;
};