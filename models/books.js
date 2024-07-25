module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        book_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        publication_date: {
            type: DataTypes.DATE
        },
        genre: {
            type: DataTypes.STRING(100)
        }
    }, {
        tableName: 'knjige',
        timestamps: false
    });
    return Book;
};
