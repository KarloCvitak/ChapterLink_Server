module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment_id: {
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
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'komentari_na_kritike',
        timestamps: false
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Review, { foreignKey: 'critic_id' });
        Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Comment;
};
