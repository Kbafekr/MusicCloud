'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Songs', [
      {
      userId: 1,
      albumId: 1,
      title: "i'mperfect",
      description: 'Fifth studio album of Ling Tosite Sigure',
      url: "https://en.wikipedia.org/wiki/I%27mperfect"
      },
      {
        userId: 2,
        albumId: 2,
        title: "The Black Market",
        description: 'Seventh studio album of Rise Against',
        url: "https://en.wikipedia.org/wiki/The_Black_Market_(Rise_Against_album)"
        },
        {
          userId: 4,
          albumId: 3,
          title: "#4",
          description: 'Debut studio album of Ling Tosite Sigure',
          url: "https://en.wikipedia.org/wiki/Number_4_(album)"
          },
    ],

      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Songs', null, {});
  }
};
