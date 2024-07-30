const express = require('express');
const { Review, Book, User, UserBook } = require('../models'); // Ensure UserBook is imported
const verifyToken = require('../middlewares/verifyToken');

module.exports = () => {
    const reviewRouter = express.Router();
    reviewRouter.use(verifyToken);


    // New endpoint to get reviews by google_books_id
    reviewRouter.get('/googleBooks/:googleBooksId', async (req, res) => {
        const { googleBooksId } = req.params;

        try {
            // Find the book by google_books_id
            const book = await Book.findOne({ where: { google_books_id: googleBooksId } });
            if (!book) {
                return res.status(404).json({ status: 'Error', message: 'Book not found' });
            }

            // Find reviews for the book using book_id
            const reviews = await Review.findAll({
                where: { book_id: book.book_id },
                include: [{ model: User }] // Include User to get user details in the review
            });

            res.json({ status: 'OK', reviews });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });



    // Get all reviews for a specific book
    reviewRouter.get('/book/:bookId', async (req, res) => {
        const { bookId } = req.params;

        try {
            const reviews = await Review.findAll({
                where: { book_id: bookId },
                include: [{ model: User }]
            });
            res.json({ status: 'OK', reviews });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Add a new review
    reviewRouter.post('/', async (req, res) => {
        const { user_id, google_books_id, rating, review_text } = req.body;

        if (!user_id || !google_books_id || rating === undefined || rating === null) {
            return res.status(400).json({ status: 'Error', message: 'Missing required fields' });
        }

        try {
            // Find or create the book
            let book = await Book.findOne({ where: { google_books_id } });
            if (!book) {
                // Create a new book entry if not found
                book = await Book.create({
                    google_books_id,
                    title: 'Title from Google API', // Placeholder
                    cover_image: 'Cover URL', // Placeholder
                    published_date: new Date() // Placeholder
                });
            }

            // Check and set the status to 'Read'
            const userBook = await UserBook.findOne({
                where: { user_id, book_id: book.book_id }
            });

            if (userBook) {
                await userBook.update({ status_id: 1 }); // Assuming 1 is the ID for 'Read'
            } else {
                await UserBook.create({ user_id, book_id: book.book_id, status_id: 1 });
            }

            // Create the review
            const newReview = await Review.create({
                user_id,
                book_id: book.book_id,
                rating,
                review_text,
                created_at: new Date()
            });

            res.json({ status: 'OK', review: newReview });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Update a specific review
    reviewRouter.put('/:critic_id', async (req, res) => {
        const { critic_id } = req.params;
        const { rating, review_text } = req.body;

        try {
            const review = await Review.findByPk(critic_id);
            if (!review) {
                return res.status(404).json({ status: 'Error', message: 'Review not found' });
            }

            review.rating = rating !== undefined ? rating : review.rating;
            review.review_text = review_text !== undefined ? review_text : review.review_text;
            await review.save();

            res.json({ status: 'OK', review });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Delete a specific review
    reviewRouter.delete('/:critic_id', async (req, res) => {
        const { critic_id } = req.params;

        try {
            const deleted = await Review.destroy({ where: { critic_id } });
            if (deleted) {
                res.json({ status: 'OK' });
            } else {
                res.status(404).json({ status: 'Error', message: 'Review not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Get reviews by a specific user
    reviewRouter.get('/user/:userId', async (req, res) => {
        const { userId } = req.params;

        try {
            const reviews = await Review.findAll({
                where: { user_id: userId },
                include: [{ model: Book }]
            });
            res.json({ status: 'OK', reviews });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    return reviewRouter;
};
