'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.User, { foreignKey: 'userId', as: 'Artist', onDelete: "cascade"})
      Song.belongsTo(models.Album, { foreignKey: 'albumId', onDelete: "cascade" })
      Song.hasMany(models.Comment, {foreignKey: 'songId', onDelete: "cascade"})
      Song.belongsToMany(models.playlist, {through: models.playlistsong, foreignKey: 'songId', onDelete: 'cascade'})
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 256]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {defaultScope: {
    attributes: {
      exclude: []
    }
  },
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
