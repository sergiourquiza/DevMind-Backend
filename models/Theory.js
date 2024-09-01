'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a Theory.
   * @extends Model
   */
  class Theory extends Model {
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
       * A theory belongs to a module.
       * @memberof Theory
       */
      Theory.belongsTo(models.Module, { foreignKey: 'moduleId' });
    }
  }

  /**
   * Initializes the Theory model with its attributes and options.
   * @memberof Theory
   * @param {object} sequelize - The Sequelize instance.
   * @param {object} DataTypes - An object containing Sequelize data types.
   * @returns {Theory} The initialized Theory model.
   */
  Theory.init({
    /**
     * The ID of the related module.
     * @type {number}
     * @memberof Theory
     * @instance
     * @property {number} moduleId - The ID of the related module.
     */
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    /**
     * The description of the theory.
     * @type {string}
     * @memberof Theory
     * @instance
     * @property {string} description - The description of the theory.
     */
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Theory',
  });

  return Theory;
};