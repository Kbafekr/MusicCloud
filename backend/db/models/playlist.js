'use strict';
const {
  Model
} = require('sequelize');

//remember that this model name is lowercase
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade'})
      playlist.belongsToMany(models.Song, {through: models.playlistsong, foreignKey: 'playlistId', onDelete: 'cascade'})
    }
  }
  playlist.init({
    userId:
     {
      type: DataTypes.INTEGER,
      allowNull: false,
     },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
     },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};
