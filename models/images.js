'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  images.init({
    image: DataTypes.STRING,
    event_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'images',
    paranoid: true,
  });
  return images;
};