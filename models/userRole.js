module.exports = (sequelize, DataTypes) => {
    const KorisnickeRole = sequelize.define('KorisnickeRole', {
        user_role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'korisnicke_role',
        timestamps: false,
    });

    KorisnickeRole.associate = (models) => {
        KorisnickeRole.belongsTo(models.User, { foreignKey: 'user_id' });
        KorisnickeRole.belongsTo(models.Role, { foreignKey: 'role_id' });
    };


    return KorisnickeRole;
};
