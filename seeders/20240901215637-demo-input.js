'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Inputs', [
      {
        exerciseId: 2,
        input: '[3, 1, 2]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        input: '[5, 4, 6, 3]',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inputs', null, {});
  }
};
