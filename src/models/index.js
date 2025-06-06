

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host:mysql://root:pNEuOjjfXvDHndkkwxNndYnJkxdyXoJd@mysql.railway.internal:3306/railway // não 'localhost' nem '127.0.0.1' se estiver em container diferente
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

module.exports = { sequelize };

