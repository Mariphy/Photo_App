const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    database: 'photoApp',
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });

module.exports = sequelize;