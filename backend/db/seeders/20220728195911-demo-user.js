'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
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
        imageUrl: 'https://pngimg.com/uploads/owl/owl_PNG2.png'
      },
      {
        firstName: 'Hack',
        lastName: 'ing',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        imageUrl: 'https://e7.pngegg.com/pngimages/978/397/png-clipart-adelie-penguin-bird-antarctica-emperor-penguin-penguin-animals-animal.png'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options);
  }
};
