'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a Progress.
   * @extends Model
   */
  class Progress extends Model {
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
       * A progress entry belongs to a user.
       * @memberof Progress
       */
      Progress.belongsTo(models.User, { foreignKey: 'userId' });
      /**
       * A progress entry belongs to a module.
       * @memberof Progress
       */
      Progress.belongsTo(models.Module, { foreignKey: 'moduleId' });
    }
  }

  /**
   * Initializes the Progress model with its attributes and options.
   * @memberof Progress
   * @param {object} sequelize - The Sequelize instance.
   * @param {object} DataTypes - An object containing Sequelize data types.
   * @returns {Progress} The initialized Progress model.
   */
  Progress.init({
    /**
     * The ID of the related user.
     * @type {number}
     * @memberof Progress
     * @instance
     * @property {number} userId - The ID of the related user.
     */
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /**
     * The ID of the related module.
     * @type {number}
     * @memberof Progress
     * @instance
     * @property {number} moduleId - The ID of the related module.
     */
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /**
     * The percentage of progress in the module.
     * @type {number}
     * @memberof Progress
     * @instance
     * @property {number} progressPercentage - The percentage of progress in the module.
     */
    progressPercentage: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Progress',
  });

  return Progress;
};