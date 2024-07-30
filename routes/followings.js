const express = require('express');
const { Follow } = require('../models'); // Import the Follow model
const verifyToken = require('../middlewares/verifyToken');

module.exports = () => {
    const followingsRouter = express.Router();
    followingsRouter.use(verifyToken);

    // Get all followings
    followingsRouter.get('/', async (req, res) => {
        try {
            const followings = await Follow.findAll();
            res.json({ status: 'OK', followings });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Create a following
    followingsRouter.post('/', async (req, res) => {
        const { follower_id, followed_id } = req.body;
        try {
            const newFollow = await Follow.create({ follower_id, followed_id });
            res.json({ status: 'OK', insertId: newFollow.follow_id });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Get a following by id
    followingsRouter.get('/:id', async (req, res) => {
        try {
            const follow = await Follow.findByPk(req.params.id);
            if (follow) {
                res.json({ status: 'OK', follow });
            } else {
                res.status(404).json({ status: 'Error', message: 'Following not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Delete a following based on follower_id and followed_id
    followingsRouter.delete('/', async (req, res) => {
        const { follower_id, followed_id } = req.body;
        try {
            const result = await Follow.destroy({
                where: {
                    follower_id: follower_id,
                    followed_id: followed_id
                }
            });
            res.json({ status: 'OK', affectedRows: result });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Check if following
    followingsRouter.get('/check/:followerId/:followedId', async (req, res) => {
        const { followerId, followedId } = req.params;
        try {
            const follow = await Follow.findOne({
                where: {
                    follower_id: followerId,
                    followed_id: followedId
                }
            });
            res.json({ isFollowing: !!follow });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    return followingsRouter;
};
