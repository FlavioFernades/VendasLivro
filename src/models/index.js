require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

console.log('Variáveis de ambiente:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '****' : 'não definida');
console.log('PORT:', port);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco OK!');

    app.get('/', (req, res) => {
      res.send('API está funcionando!');
    });

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Falha ao conectar com o banco:', error);
    process.exit(1); // Encerra a aplicação se não conectar
  }
})();
