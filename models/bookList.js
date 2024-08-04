module.exports = (sequelize, DataTypes) => {
    const BookList = sequelize.define('BookList', {
        list_book_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Liste', // Assumes the name of the list table is `Liste`
                key: 'list_id'
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Book',
                key: 'book_id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'knjiga_liste',
        timestamps: false,
        indexes: [
            {
                name: 'idx_book_id',
                fields: ['book_id']
            },
            {
                name: 'idx_list_id',
                fields: ['list_id']
            }
        ]
    });

    BookList.associate = function(models) {
        BookList.belongsTo(models.Liste, { foreignKey: 'list_id' });
        BookList.belongsTo(models.Book, { foreignKey: 'book_id' });
    };

    return BookList;
};
