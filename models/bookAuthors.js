module.exports = (sequelize, DataTypes) => {
    const BookAuthors = sequelize.define('BookAuthors', {
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'knjige', // Ensure this matches the table name
                key: 'book_id'
            }
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'autori_knjiga', // Ensure this matches the table name
                key: 'author_id'
            }
        }
    }, {
        tableName: 'knjige_has_autori_knjiga', // Explicitly specify the table name
        timestamps: false
    });

    return BookAuthors;
};
