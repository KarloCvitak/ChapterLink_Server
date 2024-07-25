module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        like_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        tableName: 'lajk:kritike',
        timestamps: false
    });
    return Like;
};
