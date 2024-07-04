const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (express, pool) => {
    const userBookRouter = express.Router();
    userBookRouter.use(verifyToken);

    userBookRouter.route('/')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM USER_BOOK');
                conn.release();
                res.json({ status: 'OK', userBooks: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const userBook = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('INSERT INTO USER_BOOK SET ?', userBook);
                conn.release();
                res.json({ status: 'OK', insertId: result.insertId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    userBookRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM USER_BOOK WHERE user_book_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', userBook: rows[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .put(async (req, res) => {
            const userBook = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('UPDATE USER_BOOK SET ? WHERE user_book_id = ?', [userBook, req.params.id]);
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
                const result = await conn.query('DELETE FROM USER_BOOK WHERE user_book_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    return userBookRouter;

};
