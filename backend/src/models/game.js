'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.User, { foreignKey: 'user_id' });
      Game.hasMany(models.GameRound, { foreignKey: 'game_id', as: 'rounds' });
    }
  }
  Game.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    result: {
      type: DataTypes.ENUM('win', 'loss'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};