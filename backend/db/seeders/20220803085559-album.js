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
        },
        {
          userId: 2,
          title: "The Black Market",
          description: 'Seventh studio album of Rise Against',
          },
        {
            userId: 1,
            title: "#4",
            description: 'Debut studio album of Ling Tosite Sigure',
            },
      ], {});
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
