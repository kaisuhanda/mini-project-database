'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cities", [
      {
        id: 1,
        city: "Jakarta",
        image: "https://media.istockphoto.com/id/500798563/id/foto/city-skyline-at-sunset-jakarta-indonesia.jpg?s=612x612&w=0&k=20&c=dICfiBlbElOeu0UceZMoFpBJ7xJF5bKyriTRZmGXHO4=",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        city: "Bali",
        image: "https://a.cdn-hotels.com/gdcs/production193/d1507/31b1801a-2519-4306-bf62-1f9ec3279cf6.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        city: "Surabaya",
        image: "https://www.suarasurabaya.net/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-08-at-15.38.43-1-840x493.jpeg.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        city: "Singapore",
        image: "https://facts.net/wp-content/uploads/2023/07/46-facts-about-singapore-1688209388.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        city: "Kuala Lumpur",
        image: "https://content.r9cdn.net/rimg/dimg/1e/f2/0916f4b2-city-4723-1628829b6c4.jpg?crop=true&width=1366&height=768&xhint=1334&yhint=1020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        city: "Manila",
        image: "https://media.istockphoto.com/id/1092423872/id/foto/cakrawala-manila-city-dan-manila-bay-filipina.jpg?s=612x612&w=0&k=20&c=V5niITNOPvH641NyyjCq-Wsz1d_90_RVLUgfa9p4shU=",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        city: "Melbourne",
        image: "https://asset-2.tstatic.net/tribunnews/foto/bank/images/scoot-bizz-1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        city: "Sydney",
        image: "https://www.thetimes.co.uk/travel/wp-content/uploads/sites/6/2021/05/New_Sydney-Opera-house-and-Harbour-bridge_Credit_Alamy_HX6C8P.jpg?w=2200&h=880&crop=1",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
