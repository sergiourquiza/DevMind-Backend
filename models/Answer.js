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
      // define association here
      /**
       * Define a many-to-one relationship with the Exercise model.
       * @memberof Answer
       */
      Answer.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
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