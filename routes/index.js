const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const bookRoutes = require('./book');
const authorRoutes = require('./author');
const reviewRoutes = require('./review');
const commentRoutes = require('./comment');
const likeRoutes = require('./like');
const followRoutes = require('./follow');
const statusRoutes = require('./status');
const roleRoutes = require('./role');
const userRoleRoutes = require('./userRole');
const genreRoutes = require('./genre');
const userBookRoutes = require('./userBook');
const bookListRoutes = require('./bookList');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/follows', followRoutes);
router.use('/statuses', statusRoutes);
router.use('/roles', roleRoutes);
router.use('/user-roles', userRoleRoutes);
router.use('/genres', genreRoutes);
router.use('/user-books', userBookRoutes);
router.use('/book-lists', bookListRoutes);

module.exports = router;
