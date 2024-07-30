const express = require('express');
const { Like, User, Review } = require('../models');
const verifyToken = require('../middlewares/verifyToken');

module.exports = () => {
    const likesRouter = express.Router();
    likesRouter.use(verifyToken);

    likesRouter.route('/')
        .get(async (req, res) => {
            try {
                const likes = await Like.findAll({
                    include: [
                        { model: User, attributes: ['username'] },
                        { model: Review }
                    ]
                });
                res.json({ status: 'OK', likes });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .post(async (req, res) => {
            const { critic_id, user_id } = req.body;
            try {
                const like = await Like.create({ critic_id, user_id });
                res.json({ status: 'OK', insertId: like.like_id });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    likesRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const like = await Like.findByPk(req.params.id, {
                    include: [
                        { model: User, attributes: ['username'] },
                        { model: Review }
                    ]
                });
                if (like) {
                    res.json({ status: 'OK', like });
                } else {
                    res.status(404).json({ status: 'Error', message: 'Like not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const deletedRows = await Like.destroy({
                    where: { like_id: req.params.id }
                });
                if (deletedRows > 0) {
                    res.json({ status: 'OK', message: 'Like deleted successfully' });
                } else {
                    res.status(404).json({ status: 'Error', message: 'Like not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    return likesRouter;
};
