module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
        follow_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        tableName: 'pracenja',
        timestamps: false
    });
    return Follow;
};
