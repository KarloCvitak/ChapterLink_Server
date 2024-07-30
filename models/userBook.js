module.exports = (sequelize, DataTypes) => {
    const UserBook = sequelize.define('UserBook', {
        user_book_id: {
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
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'knjiga_korisnika',
        timestamps: false
    });

    UserBook.associate = models => {
        UserBook.belongsTo(models.Book, { foreignKey: 'book_id' });
        UserBook.belongsTo(models.Status, { foreignKey: 'status_id' });
    };

    return UserBook;
};
