module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero_fav: {
            type: DataTypes.STRING,
            allowNull: false
        },
        acesso: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        } 
    }, { tableName: 'usuario' });

    // Associação N:N através da tabela "Leitura"
    User.associate = (models) => {
        User.hasMany(models.Leitura, {
        foreignKey: 'id_usuario',
        as: 'leitura'
        });
    };

    return User;
};