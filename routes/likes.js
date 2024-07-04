const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (express, pool) => {
    const likesRouter = express.Router();
    likesRouter.use(verifyToken);


    likesRouter.route('/')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LIKES');
                conn.release();
                res.json({ status: 'OK', likes: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const like = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('INSERT INTO LIKES SET ?', like);
                conn.release();
                res.json({ status: 'OK', insertId: result.insertId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    likesRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM LIKES WHERE like_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', like: rows[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('DELETE FROM LIKES WHERE like_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });
    return likesRouter;
};

