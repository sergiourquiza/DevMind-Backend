'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inputs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /**
       * Define a many-to-one relationship with the Difficulty model.
       * @memberof Input
       */
      Input.belongsTo(models.Exercise, { foreignKey: 'exerciseId' });
    }
  }
  Inputs.init({
    exerciseId: DataTypes.INTEGER,
    input: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Inputs',
  });
  return Inputs;
};