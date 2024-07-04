const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (express, pool) => {
    const listsRouter = express.Router();
    listsRouter.use(verifyToken);


    listsRouter.route('/')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LISTS');
                conn.release();
                res.json({ status: 'OK', lists: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const list = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('INSERT INTO LISTS SET ?', list);
                conn.release();
                res.json({ status: 'OK', insertId: result.insertId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    listsRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LISTS WHERE list_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', list: rows[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .put(async (req, res) => {
            const list = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('UPDATE LISTS SET ? WHERE list_id = ?', [list, req.params.id]);
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
                const result = await conn.query('DELETE FROM LISTS WHERE list_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });
    return listsRouter;

};
