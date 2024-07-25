module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'statusi',
        timestamps: falses
    });
    return Status;
};
