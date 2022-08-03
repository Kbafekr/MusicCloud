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
     await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: "i'mperfect",
        description: 'Fifth studio album of Ling Tosite Sigure',
        imageUrl: "https://en.wikipedia.org/wiki/I'mperfect#/media/File:I'mperfect.png"
        },
        {
          userId: 2,
          title: "The Black Market",
          description: 'Seventh studio album of Rise Against',
          imageUrl: "https://en.wikipedia.org/wiki/The_Black_Market_(Rise_Against_album)#/media/File:Riseagainsttheblackmarket.jpg"
          },
        {
            userId: 3,
            title: "#4",
            description: 'Debut studio album of Ling Tosite Sigure',
            imageUrl: "https://en.wikipedia.org/wiki/Number_4_(album)#/media/File:Rin_Toshite_Shigure_Number_4.jpg"
            },
      ],
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
