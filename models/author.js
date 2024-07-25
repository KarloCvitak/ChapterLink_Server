module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        author_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'autori_knjiga',
        timestamps: false
    });
    return Author;
};
