module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Livro', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
};
