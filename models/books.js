module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        book_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        google_books_id: { type: DataTypes.STRING, allowNull: false, unique: true },
        title: { type: DataTypes.STRING, allowNull: false },
        cover_image: { type: DataTypes.STRING, allowNull: true },
        published_date: { type: DataTypes.DATE, allowNull: true }
    }, {
        tableName: 'knjige', // Explicitly specify the table name
        timestamps: false
    });

    Book.associate = (models) => {
        Book.belongsToMany(models.Author, {
            through: 'knjige_has_autori_knjiga',
            foreignKey: 'book_id',
            otherKey: 'author_id'
        });

        Book.hasMany(models.BookList, { foreignKey: 'book_id' });

    };

    return Book;
};
