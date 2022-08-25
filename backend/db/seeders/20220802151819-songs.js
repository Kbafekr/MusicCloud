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
        title: "Feeling",
        description: 'Alternative Electronic',
        url: "https://cdn.pixabay.com/download/audio/2022/08/22/audio_82aae8fffa.mp3?filename=feeling-117865.mp3",
        imageUrl: "https://cdn.pixabay.com/audio/2022/08/22/21-27-06-616_200x200.png"
        },
        {
          userId: 2,
          albumId: 2,
          title: "The Black Market",
          description: 'Punk Rock',
          url: "https://drive.google.com/file/d/18jyaLj8L-XRhOPxTUmeY1E_tFvNlYccY/view",
          imageUrl: "https://i.ebayimg.com/images/g/a2gAAOSwssRdOYmU/s-l640.jpg"
          },
        {
            userId: 1,
            albumId: 1,
            title: "Newcomer",
            description: 'Electronic Beat',
            url: "https://cdn.pixabay.com/download/audio/2022/08/22/audio_dd8f774855.mp3?filename=newcomer-117863.mp3",
            imageUrl: "https://cdn.pixabay.com/audio/2022/08/22/21-27-22-839_200x200.png"
            },
        {
            userId: 3,
            albumId: 3,
            title: "Stylish",
            description: 'Glam Rock',
            url: "https://cdn.pixabay.com/download/audio/2022/05/17/audio_6941c02914.mp3?filename=fashion-hip-hop-rock-stylish-boy-111449.mp3",
            imageUrl: "https://cdn.pixabay.com/audio/2022/05/17/20-39-00-165_200x200.jpg"
            },
        {
            userId: 3,
            albumId: 3,
            title: "Explosive",
            description: 'Upbeat Rock',
            url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_e49f6ef16a.mp3?filename=energetic-upbeat-indie-rock-explosive-mix-112181.mp3",
            imageUrl: "https://cdn.pixabay.com/audio/2022/05/27/18-42-23-210_200x200.jpg"
            },
      {
      userId: 1,
      albumId: 4,
      title: "Metamorphose",
      description: 'So much noise',
      url: "https://drive.google.com/file/d/1QKV8nbIAdjlmRlURwVSpBMRrb88ewQcr/view",
      imageUrl: "https://i.pinimg.com/originals/67/c6/43/67c6437c9cc765de0ecac344b737e604.jpg"
      },
      {
          userId: 1,
          albumId: 4,
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
