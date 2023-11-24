'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // cities.hasMany(models.events)
      // cities.hasMany(models.accounts)
    }
  }
  cities.init({
    city: DataTypes.STRING,
    // image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cities',
  });
  return cities;
};