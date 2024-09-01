'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing an Answer.
   * @extends Model
   */
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @static
     * @param {object} models - The models used for association.
     */
    static associate(models) {
      /**
       * Define a many-to-one relationship with the Exercise model.
       * @memberof Answer
       */
      Answer.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });

      /**
       * Define a many-to-one relationship with the Input model.
       * @memberof Answer
       */
      Answer.belongsTo(models.Input, { foreignKey: 'inputId' });
    }
  }

  /**
   * Initialize the Answer model.
   * @memberof Answer
   * @param {object} sequelize - The sequelize instance.
   * @param {object} DataTypes - The data types for Sequelize.
   * @returns {Answer} The initialized Answer model.
   */
  Answer.init({
    /**
     * The ID of the related exercise.
     * @type {number}
     * @memberof Answer
     * @instance
     * @property {number} exerciseId - The ID of the related exercise.
     */
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    /**
     * The ID of the related input.
     * @type {number}
     * @memberof Answer
     * @instance
     * @property {number} inputId - The ID of the related input.
     */
    inputId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
    /**
     * The text of the answer.
     * @type {string}
     * @memberof Answer
     * @instance
     * @property {string} answer - The text of the answer.
     */
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Answer',
  });

  return Answer;
};