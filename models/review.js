module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        critic_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'kritike',
        timestamps: false
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, { foreignKey: 'user_id' });
        Review.belongsTo(models.Book, { foreignKey: 'book_id' });
        Review.hasMany(models.Comment, { foreignKey: 'critic_id' });
        Review.hasMany(models.Like, { foreignKey: 'critic_id' });
    };

    return Review;
};
