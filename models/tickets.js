'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tickets.belongsTo(models.events, {foreignKey: "event_id"})
    }
  }
  tickets.init({
    event_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    start_sales: DataTypes.DATE,
    end_sales: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};

