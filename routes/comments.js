// routes/comments.js
const express = require('express');
const { Comment, User } = require('../models');
const verifyToken = require('../middlewares/verifyToken');

module.exports = () => {
    const commentsRouter = express.Router();
    commentsRouter.use(verifyToken);

    commentsRouter.route('/')
        .get(async (req, res) => {
            try {
                const comments = await Comment.findAll({
                    include: [{ model: User, attributes: ['username'] }]
                });
                res.json({ status: 'OK', comments });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const { critic_id, user_id, comment_text } = req.body;
            try {
                const comment = await Comment.create({ critic_id, user_id, comment_text });
                res.json({ status: 'OK', insertId: comment.comment_id });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    commentsRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const comment = await Comment.findByPk(req.params.id, {
                    include: [{ model: User, attributes: ['username'] }]
                });
                if (comment) {
                    res.json({ status: 'OK', comment });
                } else {
                    res.status(404).json({ status: 'Error', message: 'Comment not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

        commentsRouter.route('/:id')
            .put(async (req, res) => {
            const { comment_text } = req.body;
            try {
                const [updatedRows] = await Comment.update({ comment_text }, {
                    where: { comment_id: req.params.id }
                });
                if (updatedRows > 0) {
                    res.json({ status: 'OK', message: 'Comment updated successfully' });
                } else {
                    res.status(404).json({ status: 'Error', message: 'Comment not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const deletedRows = await Comment.destroy({
                    where: { comment_id: req.params.id }
                });
                if (deletedRows > 0) {
                    res.json({ status: 'OK', message: 'Comment deleted successfully' });
                } else {
                    res.status(404).json({ status: 'Error', message: 'Comment not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    commentsRouter.route('/critics/:critic_id')
        .get(async (req, res) => {
            try {
                const comments = await Comment.findAll({
                    where: { critic_id: req.params.critic_id },
                    include: [{ model: User, attributes: ['username'] }]
                });
                res.json({ status: 'OK', comments });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    return commentsRouter;
};
