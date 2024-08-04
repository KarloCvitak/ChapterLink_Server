module.exports = (sequelize, DataTypes) => {
    const Liste = sequelize.define('Liste', {
        list_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'user_id'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'liste',
        timestamps: false,

    });

    Liste.associate = function(models) {
        Liste.hasMany(models.BookList, { foreignKey: 'list_id' });
        Liste.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Liste;
};
