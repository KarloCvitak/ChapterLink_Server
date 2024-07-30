module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'role',
        timestamps: false
    });
    return Role;
};
