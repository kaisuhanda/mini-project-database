'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("accounts", [
      {
        username: "Adis",
        email: "adis@gmail.com",
        password: "12345678",
        phone: "12341514",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Tika",
        email: "tika@gmail.com",
        password: "12345678",
        phone: "12341514",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Inggrid",
        email: "inggrid@gmail.com",
        password: "12345678",
        phone: "12341514",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
