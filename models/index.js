const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.pool.database, config.pool.user, config.pool.password, {
    host: config.pool.host,
    dialect: 'mysql',
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.User = require('./user')(sequelize, DataTypes);
db.Book = require('./books')(sequelize, DataTypes);
db.Author = require('./author')(sequelize, DataTypes);
db.Review = require('./review')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);
db.Like = require('./like')(sequelize, DataTypes);
db.Follow = require('./follow')(sequelize, DataTypes);
db.Status = require('./status')(sequelize, DataTypes);
db.Role = require('./role')(sequelize, DataTypes);
db.UserRole = require('./userRole')(sequelize, DataTypes);
db.Genre = require('./genre')(sequelize, DataTypes);
db.UserBook = require('./userBook')(sequelize, DataTypes);
db.Liste = require('./lists')(sequelize, DataTypes);
db.BookList = require('./bookList')(sequelize, DataTypes);
db.GenreBook = require('./genreBook')(sequelize, DataTypes);

// Define associations

// Author <-> Book (many-to-many)
db.Author.belongsToMany(db.Book, { through: 'knjige_has_autori_knjiga', foreignKey: 'author_id', timestamps: false });
db.Book.belongsToMany(db.Author, { through: 'knjige_has_autori_knjiga', foreignKey: 'book_id', timestamps: false });

// User <-> Review (one-to-many)
db.User.hasMany(db.Review, { foreignKey: 'user_id' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id' });

// Book <-> Review (one-to-many)
db.Book.hasMany(db.Review, { foreignKey: 'book_id' });
db.Review.belongsTo(db.Book, { foreignKey: 'book_id' });

// Review <-> Comment (one-to-many)
db.Review.hasMany(db.Comment, { foreignKey: 'critic_id' });
db.Comment.belongsTo(db.Review, { foreignKey: 'critic_id' });

// User <-> Comment (one-to-many)
db.User.hasMany(db.Comment, { foreignKey: 'user_id' });
db.Comment.belongsTo(db.User, { foreignKey: 'user_id' });

// User <-> Role (many-to-many)
db.User.belongsToMany(db.Role, { through: db.UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
db.Role.belongsToMany(db.User, { through: db.UserRole, foreignKey: 'role_id', otherKey: 'user_id' });

// User <-> UserBook (one-to-many)
db.User.hasMany(db.UserBook, { foreignKey: 'user_id' });
db.UserBook.belongsTo(db.User, { foreignKey: 'user_id' });

// Book <-> UserBook (one-to-many)
db.Book.hasMany(db.UserBook, { foreignKey: 'book_id' });
db.UserBook.belongsTo(db.Book, { foreignKey: 'book_id' });

// Status <-> UserBook (one-to-many)
db.Status.hasMany(db.UserBook, { foreignKey: 'status_id' });
db.UserBook.belongsTo(db.Status, { foreignKey: 'status_id' });

// User <-> List (one-to-many)
db.User.hasMany(db.Liste, { foreignKey: 'user_id' });
db.Liste.belongsTo(db.User, { foreignKey: 'user_id' });

// List <-> BookList (one-to-many)
db.Liste.hasMany(db.BookList, { foreignKey: 'list_id' });
db.BookList.belongsTo(db.Liste, { foreignKey: 'list_id' });

// Book <-> BookList (one-to-many)
db.Book.hasMany(db.BookList, { foreignKey: 'book_id' });
db.BookList.belongsTo(db.Book, { foreignKey: 'book_id' });

// Genre <-> Book (many-to-many)
db.Genre.belongsToMany(db.Book, { through: db.GenreBook, foreignKey: 'genre_id' });
db.Book.belongsToMany(db.Genre, { through: db.GenreBook, foreignKey: 'book_id' });

// User <-> Follow (self-referential many-to-many)
db.User.hasMany(db.Follow, { foreignKey: 'follower_id', as: 'Following' });
db.User.hasMany(db.Follow, { foreignKey: 'followed_id', as: 'Followers' });
db.Follow.belongsTo(db.User, { foreignKey: 'follower_id', as: 'Follower' });
db.Follow.belongsTo(db.User, { foreignKey: 'followed_id', as: 'Followed' });

// User <-> Like (one-to-many)
db.User.hasMany(db.Like, { foreignKey: 'user_id' });
db.Review.hasMany(db.Like, { foreignKey: 'critic_id' });
db.Like.belongsTo(db.User, { foreignKey: 'user_id' });
db.Like.belongsTo(db.Review, { foreignKey: 'critic_id' });

module.exports = db;
