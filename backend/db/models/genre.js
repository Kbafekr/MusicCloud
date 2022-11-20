'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.belongsTo(models.User, {foreignKey: 'userId', onDelete: "cascade"})
      Genre.belongsTo(models.Song, {foreignKey: 'songId', onDelete: "cascade"})

    }
  }
  Genre.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  },
  {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};
