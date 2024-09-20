module.exports = (sequelize, DataTypes) => {
    const Livro = sequelize.define('Livro', {
      id_livro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      autor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      data_lanc: {
        type: DataTypes.DATE,
        allowNull: false
      },
      imagem: {
        type: DataTypes.STRING,  // Caminho da imagem no servidor
        allowNull: true
      }
    }, { tableName: 'livro' });

    // Associação N:N através da tabela "Leitura"
    Livro.associate = (models) => {
      Livro.hasMany(models.Leitura, {
        foreignKey: 'id_livro',
        as: 'leitura'
      });
    };
  
    return Livro;
  };
  