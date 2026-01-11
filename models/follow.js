module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
        follow_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'korisnici', // Name of the table in your database
                key: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        followed_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'korisnici', // Name of the table in your database
                key: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'pracenja',
        timestamps: false
    });

    Follow.associate = (models) => {
        // A user can follow many users (follower_id points to the user who is following others)
        Follow.belongsTo(models.User, { foreignKey: 'follower_id', as: 'Follower' });

        // A user can be followed by many users (followed_id points to the user who is being followed)
        Follow.belongsTo(models.User, { foreignKey: 'followed_id', as: 'Followed' });
    };

    return Follow;
};
