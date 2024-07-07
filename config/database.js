// config/database.js
const { Sequelize } = require('sequelize');

// Use environment variables or fallback to hardcoded values
const host = process.env.DB_HOST || 'roundhouse.proxy.rlwy.net';
const port = process.env.DB_PORT || 13115;
const username = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'UyVqXRBgJsgnPptebbKGYTMYeVvXnyFH';
const database = process.env.DB_DATABASE || 'railway';

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

module.exports = sequelize;
