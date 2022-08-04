'use strict';
const {
  Model
} = require('sequelize');
//remember that this model name is lowercase
module.exports = (sequelize, DataTypes) => {
  class playlistsong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

//playlist model lowercase
      playlistsong.belongsTo(models.playlist, {foreignKey: 'playlistId'})
      playlistsong.belongsTo(models.Song, {foreignKey: 'songId'})
    }
  }
  playlistsong.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playlistsong',
  });
  return playlistsong;
};
