// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

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
     options.tableName = 'Genres';
     return queryInterface.bulkInsert(options, [
      {
      userId: 1,
      songId: 1,
      genre: 'Hip-Hop'
      },
      {
        userId: 1,
        songId: 1,
        genre: 'Rap'
      },
      {
        userId: 2,
        songId: 2,
        genre: 'Hip-Hop'
      },
      {
        userId: 3,
        songId: 3,
        genre: 'Rap'
      },
      {
        userId: 1,
        songId: 4,
        genre: 'Pop'
      },
      {
      userId: 3,
      songId: 5,
      genre: 'Pop'
      },
      {
        userId: 1,
        songId: 6,
        genre: 'Rock'
      },
      {
        userId: 2,
        songId: 7,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 8,
        genre: 'Swing'
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     options.tableName = 'Genres';
    return queryInterface.bulkDelete(options);
  }
};
