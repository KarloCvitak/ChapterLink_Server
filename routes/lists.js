const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const db = require('../models'); // Adjust the path if needed

module.exports = () => {
    const listsRouter = express.Router();
    listsRouter.use(verifyToken);

    // Get all lists
    listsRouter.get('/', async (req, res) => {
        try {
            const lists = await db.Liste.findAll();
            res.json({ status: 'OK', lists });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Create a new list
    listsRouter.post('/', async (req, res) => {
        const { title, description, user_id } = req.body;
        try {
            const newList = await db.Liste.create({ title, description, user_id });
            res.json({ status: 'OK', list: newList });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });


    // Get a specific list
    listsRouter.get('/listBooks/:list_id', async (req, res) => {
        try {
            const listId = req.params.list_id; // Extract the list_id from the route parameters
            console.log("listId   " + listId);
            // Fetch the list details
            const list = await db.Liste.findByPk(listId);

            if (!list) {
                return res.status(404).json({ status: 'Error', message: 'List not found' });
            }

            // Fetch all book entries associated with the given list_id
            const bookListEntries = await db.BookList.findAll({
                where: { list_id: listId },
                include: [

                            {
                                model: db.Book,
                                attributes: ['google_books_id', 'cover_image', 'title'] // Specify the attributes you need

                            }
                ],
                attributes: ['book_id', 'description'] // Include attributes from BookList, e.g., 'book_id'

            });

            const books = bookListEntries.map(entry => ({
                ...entry.Book.dataValues, // Spread Book attributes
                listAttributes: entry.dataValues // Include BookList attributes
            }));

            res.json({
                status: 'OK',
                list,
                books: books
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Get a specific list
    listsRouter.get('/:user_id', async (req, res) => {
        try {
            const userId = req.params.user_id;  // Get the user_id from the route parameters

            // Fetch lists associated with the user_id, including BookList and Book associations
            const lists = await db.Liste.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: db.BookList,
                        include: [
                            {
                                model: db.Book,
                            }
                        ]
                    }
                ]
            });

            if (lists.length > 0) {
                res.json({ status: 'OK', lists });
            } else {
                res.status(404).json({ status: 'Error', message: 'No lists found for this user' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });
    // Update a specific list
    listsRouter.put('/:id', async (req, res) => {
        const { title, description } = req.body;
        try {
            const [updated] = await db.Liste.update({ title, description }, {
                where: { list_id: req.params.id }
            });
            if (updated) {
                const updatedList = await db.Liste.findByPk(req.params.id);
                res.json({ status: 'OK', list: updatedList });
            } else {
                res.status(404).json({ status: 'Error', message: 'List not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Delete a specific list
    listsRouter.delete('/:list_id', async (req, res) => {
        try {
            const deleted = await db.Liste.destroy({
                where: { list_id: req.params.list_id }
            });
            if (deleted) {
                res.json({ status: 'OK', message: 'List deleted' });
            } else {
                res.status(404).json({ status: 'Error', message: 'List not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    return listsRouter;
};
