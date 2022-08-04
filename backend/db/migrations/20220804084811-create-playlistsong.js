'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playlistsongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'playlists',
        },
        onDelete: 'cascade'
      },
      songId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Songs',
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playlistsongs');
  }
};
