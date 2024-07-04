const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (express, pool) => {
    const commentsRouter = express.Router();
    commentsRouter.use(verifyToken);


    commentsRouter.route('/')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM COMMENTS');
                conn.release();
                res.json({ status: 'OK', comments: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const comment = {
                user_id: req.body.user_id,
                review_id: req.body.review_id,
                comment_text: req.body.comment_text
            };

            try {
                const conn = await pool.getConnection();
                const result = await conn.query('INSERT INTO COMMENTS SET ?', comment);
                conn.release();
                res.json({ status: 'OK', insertId: result.insertId });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    commentsRouter.route('/reviews/:reviewId')
        .get(async (req, res) => {
            const reviewId = parseInt(req.params.reviewId, 10);
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM COMMENTS WHERE review_id = ?', [reviewId]);
                conn.release();
                res.json({ status: 'OK', comments: rows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('DELETE FROM COMMENTS WHERE review_id = ?', [req.params.reviewId]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    commentsRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const conn = await pool.getConnection();
                const rows = await conn.query('SELECT * FROM COMMENTS WHERE comment_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', comment: rows[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .put(async (req, res) => {
            const comment = req.body;
            try {
                const conn = await pool.getConnection();
                const result = await conn.query('UPDATE COMMENTS SET ? WHERE comment_id = ?', [comment, req.params.id]);
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
                const result = await conn.query('DELETE FROM COMMENTS WHERE comment_id = ?', [req.params.id]);
                conn.release();
                res.json({ status: 'OK', affectedRows: result.affectedRows });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });
    return commentsRouter;
};
