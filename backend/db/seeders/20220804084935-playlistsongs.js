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

    await queryInterface.bulkInsert('playlistsongs', [
    {
      playlistId:1,
      songId:1
    },
    {
      playlistId:1,
      songId:2
    },
    {
      playlistId:1,
      songId:3
    },
    {
      playlistId:2,
      songId:1
    },
    {
      playlistId:2,
      songId:3
    },
    {
      playlistId:3,
      songId:2
    },
    {
      playlistId:3,
      songId:3
    }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('playlistsongs', null, {});
  }
};
