const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  database: 'PhotoApp',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD
  });

module.exports = sequelize;