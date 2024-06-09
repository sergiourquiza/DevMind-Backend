'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a Module.
   * @extends Model
   */
  class Module extends Model {
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
       * A module has many exercises.
       * @memberof Module
       */
      Module.hasMany(models.Exercise, { foreignKey: 'moduleId' });
      /**
       * A module has many theories.
       * @memberof Module
       */
      Module.hasMany(models.Theory, { foreignKey: 'moduleId' });
      /**
       * A module has many progress entries.
       * @memberof Module
       */
      Module.hasMany(models.Progress, { foreignKey: 'moduleId' });
    }
  }

  /**
   * Initializes the Module model with its attributes and options.
   * @memberof Module
   * @param {object} sequelize - The Sequelize instance.
   * @param {object} DataTypes - An object containing Sequelize data types.
   * @returns {Module} The initialized Module model.
   */
  Module.init({
    /**
     * The name of the module.
     * @type {string}
     * @memberof Module
     * @instance
     * @property {string} name - The name of the module.
     */
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /**
     * The description of the module.
     * @type {string}
     * @memberof Module
     * @instance
     * @property {string} description - The description of the module.
     */
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Module',
  });

  return Module;
};