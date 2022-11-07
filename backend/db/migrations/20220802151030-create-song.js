// EVERY create table migration file
'use strict';

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
        },
        onDelete: 'cascade',
        allowNull: false
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
        },
        onDelete: 'cascade',
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'https://www.pngall.com/wp-content/uploads/5/Black-Dog-PNG.png'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Songs', options);
  }
};
