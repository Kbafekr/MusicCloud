'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'DemoUser@me.com',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://www.pngall.com/wp-content/uploads/5/Black-Dog-PNG.png'
      },
      {
        firstName: 'FakeU',
        lastName: 'ser',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        imageUrl: 'https://vignette.wikia.nocookie.net/videogames-fanon/images/9/96/Shadow_Lugia_XD.png/revision/latest?cb=20160216174031'
      },
      {
        firstName: 'Hack',
        lastName: 'ing',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        imageUrl: 'https://imgix-media.wbdndc.net/cms/filer_public/df/72/df72932f-69ae-4f1e-ba53-cc67f057bae4/harley-quinn-kite-man-proposes.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  }
};
