// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'roundhouse.proxy.rlwy.net',
  port: 13115,
  username: 'postgres',
  password: 'UyVqXRBgJsgnPptebbKGYTMYeVvXnyFH',
  database: 'railway',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
