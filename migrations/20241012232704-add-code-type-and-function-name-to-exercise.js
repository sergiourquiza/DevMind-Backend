'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Exercises', 'codeType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'script'
    });

    await queryInterface.addColumn('Exercises', 'functionName', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Exercises', 'codeType');
    await queryInterface.removeColumn('Exercises', 'functionName');
  }
};