module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'role',
        timestamps: false,
    });

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: models.KorisnickeRole,
            foreignKey: 'role_id',
            otherKey: 'user_id'
        });
    };

    return Role;
};
