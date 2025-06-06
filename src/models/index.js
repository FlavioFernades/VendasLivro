require('dotenv').config(); // se ainda não adicionou

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Livro = require('./livro')(sequelize, DataTypes);

module.exports = db;
