'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exercises', [
      {
        moduleId: 1,
        difficultyId: 1,
        description: 'Imprime "¡Hola, mundo!" en la consola.',
        requiresInput: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        moduleId: 1,
        difficultyId: 2,
        description: 'Implementa una función para ordenar un array.',
        requiresInput: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, {});
  }
};
