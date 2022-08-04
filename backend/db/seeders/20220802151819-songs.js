'use strict';
const bcrypt = require("bcryptjs");
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
      url: "https://en.wikipedia.org/wiki/I%27mperfect",
      imageUrl: "https://i.pinimg.com/originals/67/c6/43/67c6437c9cc765de0ecac344b737e604.jpg"
      },
      {
        userId: 2,
        albumId: 2,
        title: "The Black Market",
        description: 'Post-Hardcore Punk Rock about Pollution',
        url: "https://en.wikipedia.org/wiki/The_Black_Market_(Rise_Against_album)",
        imageUrl: "https://i.ebayimg.com/images/g/a2gAAOSwssRdOYmU/s-l640.jpg"
        },
      {
          userId: 1,
          albumId: 3,
          title: "Boukan",
          description: 'Japanese Hard Rock with a Melancholy Tone',
          url: "https://en.wikipedia.org/wiki/Number_4_(album)",
          imageUrl: "https://i.pinimg.com/736x/00/64/d0/0064d0b07ddd1ba607f033b91d6b6b0e--ling-tosite-sigure-bands.jpg"
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
