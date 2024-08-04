const express = require('express');
const { Book, UserBook, Author} = require('../models');
const verifyToken = require("../middlewares/verifyToken");



module.exports = () => {
    const booksRouter = express.Router();
    booksRouter.use(verifyToken);

// Get all books
    booksRouter.get('/', async (req, res) => {
        try {
            const books = await Book.findAll();
            res.json({status: 'OK', books});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });

// Add a new book
    booksRouter.post('/', async (req, res) => {
        const { google_books_id, title, authors, cover_image, published_date,  } = req.body;
        try {
            let book = await Book.findOne({ where: { google_books_id } });
            if (!book) {
                book = await Book.create({
                    google_books_id,
                    title,
                    cover_image,
                    published_date
                });

                // Find or create the authors
                const authorNames = authors.split(',').map(name => name.trim());
                const authorPromises = authorNames.map(name => Author.findOrCreate({ where: { name }, defaults: { name } }));
                const authorResults = await Promise.all(authorPromises);
                const authorInstances = authorResults.map(result => result[0]);

                await book.setAuthors(authorInstances);

            }



            res.json({status: 'OK', book});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });

// Get a specific book
    booksRouter.get('/:id', async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            res.json({status: 'OK', book});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });

    booksRouter.get('/google/:googleBooksId', async (req, res) => {
        try {
            const book = await Book.findOne({ where: { google_books_id: req.params.googleBooksId } });
            if (book) {
                res.json({ status: 'OK', book });
            } else {
                res.status(404).json({ status: 'Error', message: 'Book not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });


// Update a specific book
    booksRouter.put('/:id', async (req, res) => {
        const bookData = req.body;
        try {
            const book = await Book.update(bookData, {where: {book_id: req.params.id}});
            res.json({status: 'OK', book});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });

// Delete a specific book
    booksRouter.delete('/:id', async (req, res) => {
        try {
            await Book.destroy({where: {book_id: req.params.id}});
            res.json({status: 'OK'});
        } catch (e) {
            console.error(e);
            res.status(500).json({status: 'Error', message: e.message});
        }
    });

    return booksRouter;
};
