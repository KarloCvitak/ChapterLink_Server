module.exports = (sequelize, DataTypes) => {
    const BookList = sequelize.define('BookList', {
        list_id: {
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
        }
    }, {
        tableName: 'knjiga_liste',
        timestamps: false
    });
    return BookList;
};
