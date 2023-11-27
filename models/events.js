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
      // define association here
      // events.belongsTo(models.cities)
      // events.belongsTo(models.categories)
      // events.belongsTo(models.accounts)
      events.hasMany(models.tickets, { foreignKey: "event_id" })
      events.belongsTo(models.categories, { foreignKey: "category_id" });
    }
  }
  events.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    promoter_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'events',
    paranoid: true,
  });
  return events;
};
