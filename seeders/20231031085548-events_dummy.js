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
    await queryInterface.bulkInsert("events", [
      {
        promoter_id: 1,
        name: "Membuat layangan",
        start_date: new Date("2023-11-12"),
        end_date: new Date("2023-11-12"),
        description: "pelatihan membuat layangan",
        location: "pos kamling",
        categories_id: 3,

        createdAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
      },
      {
        promoter_id: 1,
        name: "Membuat kue",
        start_date: new Date("2023-11-12"),
        end_date: new Date("2023-11-12"),
        description: "pelatihan membuat kue",
        location: "dapur umum",
        categories_id: 1,

        createdAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
      },
      {
        promoter_id: 1,
        name: "Belajar Programming",
        start_date: new Date("2023-11-12"),
        end_date: new Date("2023-11-12"),
        description: "ngoding",
        location: "purwadhika",
        categories_id: 4,

        createdAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
      }], {});
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
