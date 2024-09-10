'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Juan Esteban Caicedo Pardo',
        username: 'juancai',
        phoneNumber: '3125516013',
        email: 'caicedoj14@gmail.com',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Sergio Armando Urquiza Trujillo',
        username: 'sergio',
        phoneNumber: '3103235558',
        email: 'sergio@gmail.com',
        password: '1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
