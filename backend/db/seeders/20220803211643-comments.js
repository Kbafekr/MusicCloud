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
      body: 'bark'
      },
      {
        userId: 2,
        songId: 1,
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 1,
        body: 'first'
      },
      {
        userId: 1,
        songId: 1,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 1,
        body: 'opinion'
      },
      {
      userId: 1,
      songId: 2,
      body: 'bark'
      },
      {
        userId: 2,
        songId: 2,
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 2,
        body: 'first'
      },
      {
        userId: 1,
        songId: 3,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 3,
        body: 'opinion'
      },
      {
      userId: 1,
      songId: 1,
      body: 'bark'
      },
      {
        userId: 2,
        songId: 1,
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 1,
        body: 'first'
      },
      {
        userId: 1,
        songId: 1,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 1,
        body: 'opinion'
      },
      {
      userId: 1,
      songId: 2,
      body: 'bark'
      },
      {
        userId: 2,
        songId: 2,
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 2,
        body: 'first'
      },
      {
        userId: 1,
<<<<<<< Updated upstream
        songId: 1,
        body: 'hits different'
=======
        songId: 3,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 3,
        body: 'opinion'
      },
      {
        userId: 1,
        songId: 4,
        body: 'bark'
        },
        {
          userId: 2,
          songId: 4,
          body: 'this is a comment'
        },
        {
          userId: 1,
          songId: 5,
          body: 'first'
        },
        {
          userId: 1,
          songId: 5,
          body: 'new comment'
        },
        {
          userId: 3,
          songId: 6,
          body: 'opinion'
        },
        {
        userId: 1,
        songId: 6,
        body: 'bark'
        },
        {
          userId: 2,
          songId: 7,
          body: 'this is a comment'
        },
        {
          userId: 1,
          songId: 8,
          body: 'first'
        },
        {
          userId: 1,
          songId: 9,
          body: 'new comment'
        },
        {
          userId: 3,
          songId: 10,
          body: 'opinion'
        },
        {
      userId: 1,
      songId: 1,
      body: 'bark'
>>>>>>> Stashed changes
      },
      {
        userId: 2,
        songId: 1,
<<<<<<< Updated upstream
        body: 'cool song'
      },
=======
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 1,
        body: 'first'
      },
      {
        userId: 1,
        songId: 1,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 1,
        body: 'opinion'
      },
      {
      userId: 1,
      songId: 2,
      body: 'bark'
      },
      {
        userId: 2,
        songId: 2,
        body: 'this is a comment'
      },
      {
        userId: 1,
        songId: 2,
        body: 'first'
      },
      {
        userId: 1,
        songId: 3,
        body: 'new comment'
      },
      {
        userId: 3,
        songId: 3,
        body: 'opinion'
      },
      {
        userId: 1,
        songId: 11,
        body: 'bark'
        },
        {
          userId: 2,
          songId: 12,
          body: 'this is a comment'
        },
        {
          userId: 1,
          songId: 13,
          body: 'first'
        },
        {
          userId: 1,
          songId: 14,
          body: 'new comment'
        },
        {
          userId: 3,
          songId: 15,
          body: 'opinion'
        },
        {
        userId: 1,
        songId: 16,
        body: 'bark'
        },
        {
          userId: 2,
          songId: 17,
          body: 'this is a comment'
        },
        {
          userId: 1,
          songId: 18,
          body: 'first'
        },
        {
          userId: 1,
          songId: 19,
          body: 'new comment'
        },
        {
          userId: 3,
          songId: 20,
          body: 'opinion'
        },
        {
          userId: 1,
          songId: 21,
          body: 'bark'
          },
          {
            userId: 2,
            songId: 22,
            body: 'this is a comment'
          },
          {
            userId: 1,
            songId: 23,
            body: 'first'
          },
          {
            userId: 1,
            songId: 24,
            body: 'new comment'
          },
          {
            userId: 3,
            songId: 25,
            body: 'opinion'
          },
          {
          userId: 1,
          songId: 26,
          body: 'bark'
          },
          {
            userId: 2,
            songId: 27,
            body: 'this is a comment'
          },
          {
            userId: 1,
            songId: 28,
            body: 'first'
          },
          {
            userId: 1,
            songId: 29,
            body: 'new comment'
          },
          {
            userId: 3,
            songId: 30,
            body: 'opinion'
          },
          {
            userId: 1,
            songId: 31,
            body: 'bark'
            },
            {
              userId: 2,
              songId: 32,
              body: 'this is a comment'
            },
            {
              userId: 1,
              songId: 33,
              body: 'first'
            },
            {
              userId: 1,
              songId: 34,
              body: 'new comment'
            },
            {
              userId: 3,
              songId: 35,
              body: 'opinion'
            },
            {
            userId: 1,
            songId: 36,
            body: 'bark'
            },
            {
              userId: 2,
              songId: 37,
              body: 'this is a comment'
            },
            {
              userId: 1,
              songId: 38,
              body: 'first'
            },
            {
              userId: 1,
              songId: 39,
              body: 'new comment'
            },
            {
              userId: 3,
              songId: 40,
              body: 'opinion'
            },
            {
              userId: 1,
              songId: 41,
              body: 'bark'
              },
              {
                userId: 2,
                songId: 42,
                body: 'this is a comment'
              },
              {
                userId: 1,
                songId: 43,
                body: 'first'
              },
              {
                userId: 1,
                songId: 44,
                body: 'new comment'
              },
              {
                userId: 3,
                songId: 45,
                body: 'opinion'
              },
              {
              userId: 1,
              songId: 46,
              body: 'bark'
              },
              {
                userId: 2,
                songId: 47,
                body: 'this is a comment'
              },
              {
                userId: 1,
                songId: 48,
                body: 'first'
              },
              {
                userId: 1,
                songId: 49,
                body: 'new comment'
              },
              {
                userId: 3,
                songId: 50,
                body: 'opinion'
              },

>>>>>>> Stashed changes
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
