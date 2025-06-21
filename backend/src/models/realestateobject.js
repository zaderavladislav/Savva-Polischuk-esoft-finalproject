'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RealEstateObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RealEstateObject.hasMany(models.GameRound, { foreignKey: 'object_id' });
      RealEstateObject.belongsToMany(models.User, {
        through: 'UserViewedObjects',
        foreignKey: 'object_id',
        otherKey: 'user_id',
        as: 'viewedByUsers'
      });
    }
  }
  RealEstateObject.init({
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    characteristics: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    actual_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RealEstateObject',
  });
  return RealEstateObject;
};