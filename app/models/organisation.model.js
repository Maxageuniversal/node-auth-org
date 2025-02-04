// app/models/organisation.model.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Correct path

const Organisation = sequelize.define('Organisation', {
  orgId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Organisation;
