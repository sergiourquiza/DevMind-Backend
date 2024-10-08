'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        name: 'Python',
        description: '¡Descubre el poder de Python!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Java',
        description: '¡Adéntrate en el mundo de Java!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
