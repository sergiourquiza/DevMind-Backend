'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Difficulties', [
      {
        name: 'Principiante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Intermedio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avanzado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Difficulties');
  }
};
