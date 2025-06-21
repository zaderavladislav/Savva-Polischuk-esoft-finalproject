'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSetting.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserSetting.init({
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    theme: {
      type: DataTypes.ENUM('light', 'dark'),
      allowNull: false,
      defaultValue: 'light'
    },
    language: {
      type: DataTypes.ENUM('ru', 'en'),
      allowNull: false,
      defaultValue: 'ru'
    }
  }, {
    sequelize,
    modelName: 'UserSetting',
  });
  return UserSetting;
};