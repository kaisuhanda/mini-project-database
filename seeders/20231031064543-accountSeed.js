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
      {
        username: "promoter-01",
        email: "promoter-01@mail.com",
        password: "$2b$10$TyRZHZNzLqh8eJDO08gG2upxvzfVo7OvCiLu.DaWrZFD9ajfOgcYa",
        phone: "12341514",
        role: "promoter",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user-01",
        email: "user-01@mail.com",
        password: "$2b$10$TyRZHZNzLqh8eJDO08gG2upxvzfVo7OvCiLu.DaWrZFD9ajfOgcYa",
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
