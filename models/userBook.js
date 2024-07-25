module.exports = (sequelize, DataTypes) => {
    const UserBook = sequelize.define('UserBook', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'knjiga_korisnika',
        timestamps: false
    });
    return UserBook;
};
