module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        author_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false }
    }, {
        tableName: 'autori_knjiga', // Explicitly specify the table name
        timestamps: false
    });

    Author.associate = (models) => {
        Author.belongsToMany(models.Book, {
            through: 'knjige_has_autori_knjiga',
            foreignKey: 'author_id',
            otherKey: 'book_id'
        });
    };

    return Author;
};
