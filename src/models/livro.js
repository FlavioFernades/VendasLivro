  const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = new Sequelize(process.env.DATABASE_URL);

  const Livro = sequelize.define('Livro', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  (async () => {
    await sequelize.sync();
  })();

  module.exports = Livro;
