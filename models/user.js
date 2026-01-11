module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'korisnici',
        timestamps: false
    });

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: models.KorisnickeRole,
            foreignKey: 'user_id',
            otherKey: 'role_id'
        });
    };

    return User;
};
