'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("events", [
      {
        // id: 1,
        promoter_id: 3,
        category_id: 1,
        city_id: 1,
        name: "Halloween Party",
        description: "The biggest halloween party in Surabaya",
        location: "The Socialite",
        start_date: new Date("2023-10-31T19:00:00"),
        end_date: new Date("2023-10-31T22:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        promoter_id: 2,
        category_id: 3,
        city_id: 2,
        name: "Google Ads Consultation",
        description: "Consult with Google's best ad consultants",
        location: "Online",
        start_date: new Date("2023-11-20T09:00:00"),
        end_date: new Date("2023-11-20T12:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        promoter_id: 2,
        category_id: 11,
        city_id: 1,
        name: "Edu Fair Indonesia",
        description: "Find the best universities all across Indonesia",
        location: "Grand Indonesia",
        start_date: new Date("2023-11-24T14:00:00"),
        end_date: new Date("2023-11-24T16:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 4,
        promoter_id: 2,
        category_id: 8,
        city_id: 3,
        name: "Friday Service",
        description: "Small afternoon sermon",
        location: "Purwadhika",
        start_date: new Date("2023-11-24T11:00:00"),
        end_date: new Date("2023-11-24T12:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 5,
        promoter_id: 2,
        category_id: 8,
        city_id: 4,
        name: "Christmas Celebration",
        description: "Christmas service by GMS Singapore",
        location: "GMS Singapore",
        start_date: new Date("2023-12-25T18:00:00"),
        end_date: new Date("2023-12-25T20:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 6,
        promoter_id: 5,
        category_id: 2,
        name: "Investing in 20th Century",
        description: "Learn how to invest in the 20th century",
        location: "Online",
        start_date: new Date("2023-12-01T10:00:00"),
        end_date: new Date("2023-12-01T12:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 7,
        promoter_id: 7,
        category_id: 11,
        city_id: 3,
        name: "Unair Writing",
        description: "Lomba menulis cerpen untuk siswa SMP sampai dengan SMA",
        location: "Universitas Airlangga",
        start_date: new Date("2023-12-02T10:00:00"),
        end_date: new Date("2023-12-02T15:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 8,
        promoter_id: 4,
        category_id: 11,
        name: "AI For Impact",
        description: "Learn how to use artificial intelligence in order to impact the world",
        location: "Online",
        start_date: new Date("2023-11-30T09:00:00"),
        end_date: new Date("2023-11-30T13:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 9,
        promoter_id: 7,
        category_id: 1,
        city_id: 1,
        name: "Vibes Next Door",
        description: "Party hard with guest DJ Steve Aoki, Soda, and Inquisitive",
        location: "H Club Jakarta",
        start_date: new Date("2023-12-01T19:00:00"),
        end_date: new Date("2023-12-02T03:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 10,
        promoter_id: 4,
        category_id: 11,
        city_id: 7,
        name: "The Art of Creation",
        description: "Looking for a new side hustle that you will love? Try content creation using social media platforms. Taught by real experienced creative directors",
        location: "RMIT",
        start_date: new Date("2023-11-30T12:00:00"),
        end_date: new Date("2023-11-30T16:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 11,
        promoter_id: 5,
        category_id: 9,
        city_id: 8,
        name: "Monash Culinary Workshop",
        description: "Study the art of French cuisine, by renowed chef and restorateur Daniel Boloud.",
        location: "Monash University Sydney",
        start_date: new Date("2023-11-30T09:00:00"),
        end_date: new Date("2023-11-30T15:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 12,
        promoter_id: 3,
        category_id: 10,
        city_id: 4,
        name: "SNL",
        description: "Hosted by kevin hart",
        location: "Marina Bay Sands",
        start_date: new Date("2023-11-18T18:00:00"),
        end_date: new Date("2023-11-18T23:00:00"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 13,
        promoter_id: 1,
        category_id: 3,
        city_id: 4,
        name: "Membuat layangan",
        description: "pelatihan membuat layangan",
        location: "pos kamling",
        start_date: new Date("2023-11-12"),
        end_date: new Date("2023-11-12"),
        createdAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
      },
      {
        // id: 14,
        promoter_id: 1,
        city_id: 4,
        name: "Membuat kue",
        start_date: new Date("2023-11-12"),
        end_date: new Date("2023-11-12"),
        description: "pelatihan membuat kue",
        location: "dapur umum",
        category_id: 1,
        createdAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
      },
    ])
  },

  // const eventsList = [
  //     { name: 'Halloween Party', location: 'Surabaya', time: 'Tue, Oct 25, 18:00', img: Event1, price: 'Starts from 250k' },
  //     { name: 'Google Ads Consultation', location: 'Jakarta', time: 'Thu, Nov 9, 08:00', img: Event2, price: 'Starts from 100k', },
  //     { name: 'Edu Fair Indonesia', location: 'Bali', time: 'Wed, Nov 1, 07:00', img: Event3, price: 'Free' },
  //     { name: 'Sunday Service', location: 'Singapore', time: 'Sun, Oct 25, 12:00', img: Event4, price: 'Free' },
  //     { name: 'Christmas Celebration', location: 'Sydney', time: 'Sun, Dec 25, 18:00', img: Event5, price: 'Free', },
  //     { name: 'Blockchain For Business', location: 'Kuala Lumpur', time: 'Tomorrow at 09:00', img: Event6, price: 'Starts from 400k', },
  //     { name: 'Unair Writing', location: 'Surabaya', time: 'Sat, 4 Nov, at 08:00', img: Event7, price: 'Starts from 50k', },
  //     { name: 'Therapy For Troubled Teens', location: 'Manila', time: 'Wed, 1 Nov, at 09:00', img: Event8, price: 'Starts from 100k', },
  //     { name: 'If you list, you last', location: 'Singapore', time: 'Sat, 11 Nov, at 10:00', img: Event9, price: 'Starts from 100k', },
  //     { name: 'AI For Impact', location: 'Online', time: 'Mon, 20 Nov, at 09:00', img: Event10, price: 'Free', },
  //     { name: 'Vibes Next Door', location: 'Jakarta', time: 'Sat, 18 Nov, at 20:00', img: Event11, price: 'Starts from 250k', },
  //     { name: 'Progressing Chords Basics', location: 'Online', time: 'Mon, 4 Dec, at 12:00', img: Event12, price: 'Starts from 50k', },
  //     { name: 'Business of Vending Machines', location: 'Online', time: 'Wed, 1 Nov, at 09:00', img: Event13, price: 'Starts from 30k', },
  //     { name: 'Economic Development', location: 'Singapore', time: 'Sat, 9 Dec, at 10:00', img: Event14, price: 'Starts from 100k', },
  // ]

  //   const creatorsList = [
  //     { name: 'Erudite Training', eventsMade: ['Google Ads Consultation'], followers: 1000 },
  //     { name: 'Begin Group', eventsMade: ['Blockchain For Business'], followers: 1100 },
  //     { name: 'Horizon Group', eventsMade: ['Halloween Party', 'Vibes Next Door'], followers: 1000 },
  //     { name: 'AUG Student Services', eventsMade: ['Edu Fair Indonesia'], followers: 1000 },
  //     { name: 'One Christ Community', eventsMade: ['Sunday Service', 'Christmas Celebration'], followers: 1100 },
  //     { name: 'Ciputra University', eventsMade: ['AI For Impact', 'Business of Vending Machines'], followers: 2000 },
  //     { name: 'National University of Singapore', eventsMade: ['Economic Development', 'If you list, you last', 'Progressing Chords Basics'], followers: 4000 },
  //     { name: 'Better Help', eventsMade: ['Therapy For Troubled Teens'], followers: 500 },    
  // ];

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
