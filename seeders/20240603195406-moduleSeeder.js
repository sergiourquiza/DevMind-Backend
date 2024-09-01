'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        name: 'HTML',
        description: 'Esto es un texto plano y una prueba anti gay y trolls',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CSS',
        description: 'Esto es un texto plano y una prueba anti gay y trolls CSS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'JavaScript',
        description: 'Esto es un texto plano y una prueba anti gay y trolls JS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
