module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'zanr_knjiga',
        timestamps: false
    });
    return Genre;
};
