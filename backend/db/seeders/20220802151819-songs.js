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
      description: 'So much noise',
      url: "https://drive.google.com/file/d/1QKV8nbIAdjlmRlURwVSpBMRrb88ewQcr/view",
      imageUrl: "https://i.pinimg.com/originals/67/c6/43/67c6437c9cc765de0ecac344b737e604.jpg"
      },
      {
        userId: 2,
        albumId: 2,
        title: "The Black Market",
        description: 'Cool message',
        url: "https://drive.google.com/file/d/18jyaLj8L-XRhOPxTUmeY1E_tFvNlYccY/view",
        imageUrl: "https://i.ebayimg.com/images/g/a2gAAOSwssRdOYmU/s-l640.jpg"
        },
      {
          userId: 1,
          albumId: 3,
          title: "Boukan",
          description: 'Slow start heavy finish',
          url: "https://drive.google.com/file/d/1y6qap5Me1v7o8YFxjqF4GhxvXFf4IuvQ/view",
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
