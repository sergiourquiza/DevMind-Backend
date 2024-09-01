'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Theories', [
      {
        moduleId: 1,
        description: 'Python es un lenguaje de programación de alto nivel, fácil de aprender y con una sintaxis clara. Ideal para desarrollo web, análisis de datos, inteligencia artificial y automatización.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        moduleId: 2,
        description: 'Java es un lenguaje de programación versátil y orientado a objetos, conocido por su portabilidad y robustez. Utilizado en desarrollo de aplicaciones web, móviles y empresariales, Java ofrece una sólida base para soluciones escalables y seguras.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Theories', null, {});
  }
};
