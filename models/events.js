'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // events.belongsTo(models.cities)
      // events.belongsTo(models.categories)
      // events.belongsTo(models.accounts)
      events.hasMany(models.tickets, {foreignKey: "event_id"})
    }
  }
  events.init({
    promoter_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};
