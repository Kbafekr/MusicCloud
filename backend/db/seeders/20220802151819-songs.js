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
      title: "Metamorphose",
      description: 'Post-hardcore Japanese Math Rock Hybrid',
      url: "https://en.wikipedia.org/wiki/I%27mperfect"
      },
      {
        userId: 2,
        albumId: 2,
        title: "The Black Market",
        description: 'Post-Hardcore Punk Rock about Pollution',
        url: "https://en.wikipedia.org/wiki/The_Black_Market_(Rise_Against_album)"
        },
      {
          userId: 1,
          albumId: 3,
          title: "Boukan",
          description: 'Japanese Hard Rock with a Melancholy Tone',
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
