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
     await queryInterface.bulkInsert('Comments', [
      {
      userId: 1,
      songId: 1,
      body: 'crazy guitar solo'
      },
      {
        userId: 1,
        songId: 3,
        body: 'hit different'
      },
      {
        userId: 2,
        songId: 2,
        body: 'punk phase'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
