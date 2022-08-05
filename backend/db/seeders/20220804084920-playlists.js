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
   await queryInterface.bulkInsert('playlists', [
    {
    userId: 1,
    name: 'Zzz',
    imageUrl: 'http://wallup.net/wp-content/uploads/2016/01/220756-Batman-Batman_Arkham_Knight.jpg'
   },
   {
    userId: 2,
    name: 'Morning Boost',
    imageUrl: 'https://cliparting.com/wp-content/uploads/2018/03/cool-pictures-2018-32.jpg'
   },
   {
    userId: 3,
    name: 'A3',
    imageUrl: 'https://www.desktopbackground.org/download/1280x900/2015/09/16/1012027_cool-interactive-desktop-backgrounds_1512x934_h.jpg'
   }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('playlists', null, {});
  }
};
