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
        userId: 2,
        songId: 2,
        genre: 'Intense'
      },
      {
        userId: 3,
        songId: 3,
        genre: 'Rap'
      },
      {
        userId: 3,
        songId: 3,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 4,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 4,
        genre: 'Electronic'
      },
      {
      userId: 3,
      songId: 5,
      genre: 'Pop'
      },
      {
      userId: 3,
      songId: 5,
      genre: 'Rock'
      },
      {
        userId: 1,
        songId: 6,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 6,
        genre: 'J-Rock'
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
      {
        userId: 2,
        songId: 8,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 9,
        genre: 'Alternative'
      },
      {
        userId: 2,
        songId: 9,
        genre: '8-bit'
      },
      {
        userId: 3,
        songId: 10,
        genre: 'R&B'
      },
      {
        userId: 3,
        songId: 10,
        genre: 'Soul'
      },
      {
        userId: 3,
        songId: 11,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 11,
        genre: 'Alternative'
      },
      {
        userId: 1,
        songId: 12,
        genre: 'Rap'
      },
      {
        userId: 1,
        songId: 12,
        genre: 'Electronic'
      },
      {
        userId: 2,
        songId: 13,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 13,
        genre: 'Pop'
      },
      {
        userId: 2,
        songId: 14,
        genre: 'Folk'
      },
      {
        userId: 2,
        songId: 14,
        genre: 'Indie'
      },
      {
        userId: 2,
        songId: 15,
        genre: 'Folk'
      },
      {
        userId: 2,
        songId: 15,
        genre: 'Indie'
      },
      {
        userId: 1,
        songId: 16,
        genre: 'Drumstep'
      },
      {
        userId: 1,
        songId: 16,
        genre: 'Dubstep'
      },
      {
        userId: 3,
        songId: 17,
        genre: 'Classical'
      },
      {
        userId: 1,
        songId: 18,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 18,
        genre: 'Grunge'
      },
      {
        userId: 1,
        songId: 18,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 19,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 19,
        genre: 'Epic'
      },
      {
        userId: 3,
        songId: 20,
        genre: 'Blues'
      },
      {
        userId: 1,
        songId: 20,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 21,
        genre: 'Sounds'
      },
      {
        userId: 1,
        songId: 22,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 22,
        genre: 'Dubstep'
      },
      {
        userId: 1,
        songId: 23,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 24,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 25,
        genre: 'Electronic'
      },
      {
        userId: 3,
        songId: 26,
        genre: 'Indie'
      },
      {
        userId: 3,
        songId: 27,
        genre: 'Soul'
      },
      {
        userId: 3,
        songId: 27,
        genre: 'R&B'
      },
      {
        userId: 3,
        songId: 27,
        genre: 'Hip-Hop'
      },
      {
        userId: 3,
        songId: 27,
        genre: 'Rap'
      },
      {
        userId: 1,
        songId: 28,
        genre: 'J-Rock'
      },
      {
        userId: 1,
        songId: 28,
        genre: 'Rock'
      },
      {
        userId: 2,
        songId: 29,
        genre: 'Punk'
      },
      {
        userId: 2,
        songId: 29,
        genre: 'Emo'
      },
      {
        userId: 2,
        songId: 29,
        genre: 'Pop'
      },
      {
        userId: 2,
        songId: 29,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 30,
        genre: 'Alternative'
      },
      {
        userId: 1,
        songId: 30,
        genre: 'Indie'
      },
      {
        userId: 1,
        songId: 31,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 31,
        genre: 'Grunge'
      },
      {
        userId: 1,
        songId: 31,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 32,
        genre: 'Emo'
      },
      {
        userId: 1,
        songId: 32,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 32,
        genre: 'Punk'
      },
      {
        userId: 2,
        songId: 33,
        genre: 'Rap'
      },
      {
        userId: 2,
        songId: 33,
        genre: 'Rock'
      },
      {
        userId: 2,
        songId: 33,
        genre: 'Hip-Hop'
      },
      {
        userId: 1,
        songId: 34,
        genre: 'Epic'
      },
      {
        userId: 1,
        songId: 34,
        genre: 'Drama'
      },
      {
        userId: 1,
        songId: 35,
        genre: 'Rap'
      },
      {
        userId: 1,
        songId: 35,
        genre: 'Hip-Hop'
      },
      {
        userId: 1,
        songId: 36,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 36,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 37,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 37,
        genre: 'Alternative'
      },
      {
        userId: 1,
        songId: 38,
        genre: 'Modern'
      },
      {
        userId: 1,
        songId: 38,
        genre: 'Grunge'
      },
      {
        userId: 1,
        songId: 38,
        genre: 'Epic'
      },
      {
        userId: 1,
        songId: 38,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 39,
        genre: 'Indie'
      },
      {
        userId: 1,
        songId: 39,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 39,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 40,
        genre: 'Sounds'
      },
      {
        userId: 2,
        songId: 41,
        genre: 'Alternative'
      },
      {
        userId: 2,
        songId: 41,
        genre: 'Indie'
      },
      {
        userId: 2,
        songId: 41,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 42,
        genre: 'Classical'
      },
      {
        userId: 1,
        songId: 43,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 43,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 44,
        genre: 'J-Rock'
      },
      {
        userId: 1,
        songId: 44,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 45,
        genre: 'Rock'
      },
      {
        userId: 3,
        songId: 45,
        genre: 'Pop'
      },
      {
        userId: 1,
        songId: 46,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 46,
        genre: 'Electronic'
      },
      {
        userId: 3,
        songId: 47,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 47,
        genre: 'Post-Hardcore'
      },
      {
        userId: 1,
        songId: 48,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 48,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 48,
        genre: 'Alternative'
      },
      {
        userId: 1,
        songId: 49,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 49,
        genre: 'Electronic'
      },
      {
        userId: 1,
        songId: 49,
        genre: 'Alternative'
      },
      {
        userId: 1,
        songId: 50,
        genre: 'J-Rock'
      },
      {
        userId: 1,
        songId: 50,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 51,
        genre: 'Hip-Hop'
      },
      {
        userId: 1,
        songId: 51,
        genre: 'Rap'
      },
      {
        userId: 2,
        songId: 52,
        genre: 'Hip-Hop'
      },
      {
        userId: 2,
        songId: 52,
        genre: 'Intense'
      },
      {
        userId: 3,
        songId: 53,
        genre: 'Rap'
      },
      {
        userId: 3,
        songId: 53,
        genre: 'Electronic'
      },
      {
        userId: 3,
        songId: 54,
        genre: 'Indie'
      },
      {
        userId: 3,
        songId: 54,
        genre: 'Pop'
      },
      {
        userId: 2,
        songId: 55,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 56,
        genre: 'Jazz'
      },
      {
        userId: 2,
        songId: 56,
        genre: 'Swing'
      },
      {
        userId: 3,
        songId: 57,
        genre: 'Indie'
      },
      {
        userId: 2,
        songId: 57,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 58,
        genre: 'J-Rock'
      },
      {
        userId: 1,
        songId: 58,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 59,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 59,
        genre: 'J-Rock'
      },
      {
        userId: 1,
        songId: 60,
        genre: 'Rock'
      },
      {
        userId: 1,
        songId: 60,
        genre: 'J-Rock'
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
