const { Sequelize } = require('sequelize');

const db = new Sequelize('restapi', 'postgres', 'password', {
    host: 'db',
    dialect: 'postgres'
  });

module.exports = db;


