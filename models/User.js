'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Class representing a User.
   * @extends Model
   */
  class User extends Model {
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
       * A user has many progress entries.
       * @memberof User
       */
      User.hasMany(models.Progress, { foreignKey: 'userId' });
      /**
       * A user has many user exercises.
       * @memberof User
       */
      User.hasMany(models.UserExercise, { foreignKey: 'userId' });
    }
  }

  /**
   * Initializes the User model with its attributes and options.
   * @memberof User
   * @param {object} sequelize - The Sequelize instance.
   * @param {object} DataTypes - An object containing Sequelize data types.
   * @returns {User} The initialized User model.
   */
  User.init({
    /**
     * The Google ID of the user (if using Google authentication).
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} googleId - The Google ID of the user.
     */
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },

    /**
     * The full name of the user.
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} fullName - The full name of the user.
     */
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /**
     * The username of the user.
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} username - The username of the user.
     */
    username: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },

    /**
     * The phone number of the user.
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} phoneNumber - The phone number of the user.
     */
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },

    /**
     * The email of the user.
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} email - The email of the user.
     */
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    
    /**
     * The password of the user.
     * @type {string}
     * @memberof User
     * @instance
     * @property {string} password - The password of the user.
     */
    password: {
      type: DataTypes.STRING,
      allowNull: true,

    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};