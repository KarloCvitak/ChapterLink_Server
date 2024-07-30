const express = require('express');
const { Book, UserBook } = require('../models');
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
        const bookData = req.body;
        try {
            const book = await Book.create(bookData);
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
