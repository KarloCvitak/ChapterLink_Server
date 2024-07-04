const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (express, pool) => {
    const listsBookRouter = express.Router();
    listsBookRouter.use(verifyToken);


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
        })
        .post(async (req, res) => {
            const listsBook = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('INSERT INTO LISTS_BOOK SET ?', listsBook);
                conn.release();
                res.json({ status: 'OK', insertId: result.insertId });
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
