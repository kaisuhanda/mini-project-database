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
      events.belongsTo(models.categories, { foreignKey: "categories_id" });
    }
  }
  events.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    promoter_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    categories_id: DataTypes.INTEGER,
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