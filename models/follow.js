module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
        follow_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        followed_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'pracenja',
        timestamps: false
    });
    return Follow;
};
