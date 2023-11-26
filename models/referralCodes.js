'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReferralCodes extends Model {
    static associate(models) {
      // define association here
    }
  }
  ReferralCodes.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      deletedAt: {
        type: DataTypes.DATE
      },
    },
    {
      sequelize,
      modelName: 'ReferralCodes',
      tableName: 'referralcodes',// ini untuk nama tabel
      paranoid: true,
    }
  );
  return ReferralCodes;
};

