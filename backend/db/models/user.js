'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

const { Sequelize, Op } = require("sequelize");



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const  { firstName, lastName, id, username, email, imageUrl } = this; // context will be the User instance
      return { firstName, lastName, id, username, email, imageUrl };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            firstName: credential,
            lastName: credential,
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //signup
    static async signup({ firstName, lastName, email, username, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }


  static associate(models) {
    // define association here
    User.hasMany(models.Song, {foreignKey: 'userId', onDelete: 'CASCADE'})
    User.hasMany(models.Album, {foreignKey: 'userId', onDelete: 'CASCADE'})
    User.hasMany(models.Comment, {foreignKey: 'userId', onDelete: 'CASCADE'})
    User.hasMany(models.Genre, {foreignKey: 'userId', onDelete: 'CASCADE'})
    User.hasMany(models.playlist, {foreignKey: 'userId', onDelete: 'CASCADE'})

};
  }
  User.init(
    {
      //added firstname
      firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    //added lastname
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://www.pngall.com/wp-content/uploads/5/Black-Dog-PNG.png'
      }
    },
    {defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
