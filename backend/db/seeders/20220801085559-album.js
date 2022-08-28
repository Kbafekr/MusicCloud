"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Albums",
      [
        {
          userId: 1,
          title: "Prazkhanal",
          description: "Laid-back Electronic Music",
          imageUrl:
            "https://png.pngtree.com/background/20210711/original/pngtree-electronic-music-poster-background-picture-image_1087797.jpg",
        },
        {
          userId: 2,
          title: "Lexin Music",
          description: "Uplifting Piano Music",
          imageUrl:
            "https://cdn.pixabay.com/audio/2022/08/10/18-47-13-464_200x200.jpg",
        },
        {
          userId: 3,
          title: "AlexGrohl",
          description: "Upbeat Electronic Rock Music ",
          imageUrl:
            "https://wallpaperaccess.com/full/39627.jpg",
        },
        {
          userId: 1,
          title: "Video Game Music",
          description: "Tunes in 8-bit",
          imageUrl:
            "https://media.wired.co.uk/photos/606d9d25751ea43ccd9887e7/master/w_1600%2Cc_limit/wired-retro-gaming-4.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Albums", null, {});
  },
};
