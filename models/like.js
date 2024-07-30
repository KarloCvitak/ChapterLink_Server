module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        like_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        critic_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'lajk_kritike',
        timestamps: false
    });

    Like.associate = (models) => {
        Like.belongsTo(models.Review, { foreignKey: 'critic_id' });
        Like.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Like;
};
