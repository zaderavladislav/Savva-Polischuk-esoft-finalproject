'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameRound extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GameRound.belongsTo(models.Game, { foreignKey: 'game_id' });
      GameRound.belongsTo(models.RealEstateObject, { foreignKey: 'object_id' });
    }
  }
  GameRound.init({
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    object_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guessed_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'GameRound',
  });
  return GameRound;
};