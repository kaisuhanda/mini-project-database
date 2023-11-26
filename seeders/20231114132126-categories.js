'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        category: "Music",
        image: "https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/concert-photography/thumbnail.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        category: "Business & Finance",
        image: "https://imageio.forbes.com/specials-images/imageserve/634424102b7ff12772de06ab/Businesswoman-shaking-hands-with-coworker-in-hotel/960x0.jpg?height=473&width=711&fit=bounds",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        category: "Photography & Videography",
        image: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-learning-feature.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        category: "Fashion & Beauty",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMzv6yd-W0JgYmZiEOKoodAXIsweD5-AJqQBOp39XJ5qq-fgvbN5LkM4xlLMugmFmNjU&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        category: "Visual Arts",
        image: "https://www.thoughtco.com/thmb/sIAf4l4cXNKBYHBoi5dRFoMaBYY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/montreal-museums-day-2016-2017-2018-guylain-doyle-getty-56a910753df78cf772a34c8a.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        category: "Sports",
        image: "https://www.chase.co.uk/gb/en/static/1c263d0f7519e403ecc0fd48fdd73b33/Article-hero-desktop-sports-escape-gb-getty1336646871.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        category: "E-Sports",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/96/LGD_Gaming_at_the_2015_LPL_Summer_Finals.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        category: "Religion",
        image: "https://i.guim.co.uk/img/media/be946293cd6bb53b2dfbbf810624642c1b3b194d/0_0_6048_3627/master/6048.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0affd970f1b36a63cee337ff77ef6f77",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        category: "Food & Drink",
        image: "https://www.ecpi.edu/sites/default/files/culinary_14.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        category: "Comedy",
        image: "https://www.summitcomedy.com/wp-content/uploads/2019/01/Kevin-Hart-2-300x200.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        category: "Education",
        image: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
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
