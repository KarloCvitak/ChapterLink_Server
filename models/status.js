module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'statusi',
        timestamps: false
    });
    return Status;
};
