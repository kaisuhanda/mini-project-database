'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tickets", [
      {
        event_id: 1,
        type: "free",
        stock: 100,
        price: 0,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 1,
        type: "paid",
        stock: 100,
        price: 30000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 1,
        type: "VIP",
        stock: 100,
        price: 80000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        type: "paid",
        stock: 30,
        price: 200000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 3,
        type: "free",
        stock: 100,
        price: 0,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 4,
        type: "free",
        stock: 20,
        price: 0,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 5,
        type: "free",
        stock: 2000,
        price: 40000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 5,
        type: "VIP",
        stock: 1000,
        price: 50000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 6,
        type: "paid",
        stock: 100,
        price: 300000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 7,
        type: "early bid",
        stock: 40,
        price: 250000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 7,
        type: "normal",
        stock: 60,
        price: 400000,
        start_sales: new Date('2023-11-30'),
        end_sales: new Date('2023-12-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 8,
        type: "paid",
        stock: 100,
        price: 80000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 9,
        type: "early",
        stock: 100,
        price: 200000,
        start_sales: new Date('2023-11-10'),
        end_sales: new Date('2023-11-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 9,
        type: "normal",
        stock: 200,
        price: 250000,
        start_sales: new Date('2023-11-20'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 10,
        type: "paid",
        stock: 100,
        price: 300000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 11,
        type: "paid",
        stock: 100,
        price: 1000000,
        start_sales: new Date('2023-10-31'),
        end_sales: new Date('2023-11-30'),
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