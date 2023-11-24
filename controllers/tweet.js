const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Pastikan Anda mengganti ini dengan konfigurasi koneksi database yang sesuai

class Tweet extends Model {}

Tweet.init({
  content: {
    type: DataTypes.STRING, // Gantilah dengan tipe data yang sesuai
    allowNull: false,
  },
  // Definisikan atribut lain yang diperlukan sesuai kebutuhan
}, {
  sequelize,
  modelName: 'tweet', // Nama model
  tableName: 'tweets', // Nama tabel di database
});

module.exports = Tweet;
