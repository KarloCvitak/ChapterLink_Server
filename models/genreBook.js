module.exports = (sequelize, DataTypes) => {
    const GenreBook = sequelize.define('GenreBook', {
        genre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: 'zanr_knjiga_has_knjige',
        timestamps: false
    });
    return GenreBook;
};
