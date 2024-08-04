const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');
const db = require('../models'); // Adjust the path if needed

module.exports = (express, pool) => {
    const listsBookRouter = express.Router();
    listsBookRouter.use(verifyToken);


    listsBookRouter.post('/', async (req, res) => {
        const bookListEntries = req.body; // Array of book entries

        try {
            // Validate input
            if (!Array.isArray(bookListEntries) || bookListEntries.length === 0) {
                return res.status(400).json({ status: 'Error', message: 'Invalid input' });
            }

            // Create an array of promises for adding each book to the list
            const promises = bookListEntries.map(entry => {
                return db.BookList.create({
                    list_id: entry.list_id,
                    book_id: entry.book_id,
                    description: entry.description
                });
            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            res.json({ status: 'OK' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error', message: error.message });
        }
    });


    listsBookRouter.route('/')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LISTS_BOOK');
                conn.release();
                res.json({ status: 'OK', listsBooks: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    listsBookRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LISTS_BOOK WHERE lists_book_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', listsBook: rows[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .put(async (req, res) => {
            const listsBook = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('UPDATE LISTS_BOOK SET ? WHERE lists_book_id = ?', [listsBook, req.params.id]);
                conn.release();
                res.json({ status: 'OK', changedRows: result.changedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('DELETE FROM LISTS_BOOK WHERE lists_book_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    return listsBookRouter;


};
