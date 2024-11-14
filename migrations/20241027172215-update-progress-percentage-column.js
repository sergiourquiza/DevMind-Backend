'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Progresses', 'progressPercentage', {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Progresses', 'progressPercentage', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: true
    });
  }
};
