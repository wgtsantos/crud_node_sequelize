module.exports = (sequelize, DataTypes) => {
    const Leitura = sequelize.define('Leitura', {
      id_leitura: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario', // Nome da tabela de usuario
          key: 'id_usuario'
        }
      },
      id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'livro', // Nome da tabela de livro
          key: 'id_livro'
        }
      },
      status_leitura: {
        type: DataTypes.ENUM('Não iniciado', 'Em andamento', 'Concluído'),
        allowNull: false
      }
    }, { tableName: 'leitura' });

    // Associação com Usuário
    Leitura.associate = (models) => {
      Leitura.belongsTo(models.User, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      // Associação com Livro
      Leitura.belongsTo(models.Livro, {
        foreignKey: 'id_livro',
        as: 'livro'
      });
    };
  
    return Leitura;

  };
  