'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        image: "https://images.bisnis.com/posts/2021/10/31/1460255/halloween-1.jpg",
        event_id: 1
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Ads_logo.svg/1200px-Google_Ads_logo.svg.png",
        event_id: 2
      },
      {
        image: "https://smapatradharma.sch.id/wp-content/uploads/2022/06/logo-edufair-EDIT-2-02-300x300.jpg",
        event_id: 3
      },
      {
        image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/good-friday-service-flyer-template-design-859b0e23a2da44ea68fa23668ac0316f_screen.jpg?ts=1642015160",
        event_id: 4
      },
    ], {});



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
