'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers', [
      {
        exerciseId: 1,
        answer: 'Hello, World!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        inputId: 1,
        answer: '[1, 2, 3]', // Respuesta esperada para el input '[3, 1, 2]'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        exerciseId: 2,
        inputId: 2,
        answer: '[3, 4, 5, 6]', // Respuesta esperada para el input '[5, 4, 6, 3]'
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
