'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a Difficulty.
   * @extends Model
   */
  class Difficulty extends Model {
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
       * Define a one-to-many relationship with the Exercise model.
       * @memberof Difficulty
       */
      Difficulty.hasMany(models.Exercise, { foreignKey: 'difficultyId' });
    }
  }

  /**
   * Initialize the Difficulty model.
   * @memberof Difficulty
   * @param {object} sequelize - The sequelize instance.
   * @param {object} DataTypes - The data types for Sequelize.
   * @returns {Difficulty} The initialized Difficulty model.
   */
  Difficulty.init({
    /**
     * The name of the difficulty level.
     * @type {string}
     * @memberof Difficulty
     * @instance
     * @property {string} name - The name of the difficulty level.
     */
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Difficulty',
  });

  return Difficulty;
};