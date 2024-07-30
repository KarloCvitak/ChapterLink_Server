const express = require('express');
const { UserBook, Book, Status, Author, BookAuthor } = require('../models'); // Adjust imports as needed
const verifyToken = require("../middlewares/verifyToken"); // Assuming models are defined and exported from '../models'

module.exports = () => {
    const userBookRouter = express.Router();
    userBookRouter.use(verifyToken);

    // Get all user books
    userBookRouter.get('/', async (req, res) => {
        try {
            const userBooks = await UserBook.findAll({
                include: [{ model: Book }, { model: Status }]
            });
            res.json({ status: 'OK', userBooks });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Add a user book
    userBookRouter.post('/', async (req, res) => {
        const { user_id, google_books_id, title, authors, cover_image, published_date, status_id } = req.body;

        if (!google_books_id || !title || !authors || !status_id) {
            return res.status(400).json({ status: 'Error', message: 'Missing required fields' });
        }

        try {
            // Find or create the book
            let book = await Book.findOne({ where: { google_books_id } });
            if (!book) {
                book = await Book.create({
                    google_books_id,
                    title,
                    cover_image,
                    published_date
                });
            }

            // Find or create the authors
            const authorNames = authors.split(',').map(name => name.trim());
            const authorPromises = authorNames.map(name => Author.findOrCreate({ where: { name }, defaults: { name } }));
            const authorResults = await Promise.all(authorPromises);
            const authorInstances = authorResults.map(result => result[0]);

            await book.setAuthors(authorInstances);

            // Find existing user book entry
            let userBook = await UserBook.findOne({ where: { user_id, book_id: book.book_id } });

            if (userBook) {
                // Update status if the book is already in the user's list
                userBook.status_id = status_id;
                await userBook.save();
                res.json({ status: 'OK', userBook });
            } else {
                // Create a new entry if the book is not in the user's list
                userBook = await UserBook.create({
                    user_id,
                    book_id: book.book_id,
                    status_id
                });
                res.json({ status: 'OK', userBook });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    userBookRouter.get('/status', async (req, res) => {
        const { user_id, google_books_id } = req.query;

        try {
            const userBook = await UserBook.findOne({
                where: { user_id },
                include: {
                    model: Book,
                    where: { google_books_id }
                }
            });

            if (userBook) {
                res.json({ status: 'OK', status_id: userBook.status_id });
            } else {
                res.json({ status: 'OK', status_id: null });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });


    // Get a specific user book
    userBookRouter.get('/:id', async (req, res) => {
        try {
            const userBook = await UserBook.findByPk(req.params.id, {
                include: [{ model: Book }, { model: Status }]
            });
            res.json({ status: 'OK', userBook });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Update a specific user book
    userBookRouter.put('/:id', async (req, res) => {
        const userBookData = req.body;
        try {
            const [updated] = await UserBook.update(userBookData, { where: { user_book_id: req.params.id } });
            if (updated) {
                const updatedUserBook = await UserBook.findByPk(req.params.id);
                res.json({ status: 'OK', userBook: updatedUserBook });
            } else {
                res.status(404).json({ status: 'Error', message: 'UserBook not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Delete a specific user book
    userBookRouter.delete('/:id', async (req, res) => {
        try {
            const deleted = await UserBook.destroy({ where: { user_book_id: req.params.id } });
            if (deleted) {
                res.json({ status: 'OK' });
            } else {
                res.status(404).json({ status: 'Error', message: 'UserBook not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    userBookRouter.delete('/:userId/:googleBooksId/status', async (req, res) => {
        const { userId, googleBooksId } = req.params;
        try {
            const book = await Book.findOne({ where: { google_books_id: googleBooksId } });
            if (!book) {
                return res.status(404).json({ status: 'Error', message: 'Book not found' });
            }

            const deleted = await UserBook.destroy({
                where: {
                    user_id: userId,
                    book_id: book.book_id
                }
            });

            if (deleted) {
                res.json({ status: 'OK' });
            } else {
                res.status(404).json({ status: 'Error', message: 'UserBook not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });


    // Get books by user and status
    userBookRouter.get('/user/:userId/status/:statusId', async (req, res) => {
        const { userId, statusId } = req.params;
        try {
            const userBooks = await UserBook.findAll({
                where: { user_id: userId, status_id: statusId },
                include: [{ model: Book }]
            });
            res.json({ status: 'OK', books: userBooks });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    return userBookRouter;
};
