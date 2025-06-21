'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserSetting, { foreignKey: 'userId', as: 'settings' });
      User.hasMany(models.Game, { foreignKey: 'user_id', as: 'games' });
      User.belongsToMany(models.RealEstateObject, {
        through: 'UserViewedObjects',
        foreignKey: 'user_id',
        otherKey: 'object_id',
        as: 'viewedObjects'
      });
      User.hasOne(models.Token, { foreignKey: 'user_id' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};