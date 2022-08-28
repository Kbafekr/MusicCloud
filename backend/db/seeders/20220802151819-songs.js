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
          title: "Inspiring Cinematic Piano",
          description: 'Classical Piano Solo',
          url: "https://cdn.pixabay.com/download/audio/2022/08/10/audio_158527cbab.mp3?filename=inspiring-cinematic-piano-116957.mp3",
          imageUrl: "https://cdn.pixabay.com/audio/2022/08/10/18-47-13-464_200x200.jpg"
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
      title: "Feed the Machine",
      description: 'Classic Video Game Sound',
      url: "https://cdn.pixabay.com/download/audio/2022/08/09/audio_4bd7b03f6c.mp3?filename=feed-the-machine-classic-arcade-game-116846.mp3",
      imageUrl: "https://cdn.pixabay.com/audio/2022/08/09/16-40-54-414_200x200.jpg"
      },
      {
          userId: 1,
          albumId: 4,
          title: "Floppy Disk",
          description: 'Level 1',
          url: "https://cdn.pixabay.com/audio/2022/08/09/audio_b7595a37c1.mp3",
          imageUrl: "https://cdn.pixabay.com/audio/2022/08/09/16-40-54-414_200x200.jpg"
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
