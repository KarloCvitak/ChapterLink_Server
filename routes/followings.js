const express = require('express');
const { Follow } = require('../models'); // Import the Follow model
const verifyToken = require('../middlewares/verifyToken');
const db = require('../models'); // Adjust the path if needed


module.exports = () => {
    const followingsRouter = express.Router();
    followingsRouter.use(verifyToken);




    followingsRouter.get('/:user_id', async (req, res) => {
        const { user_id } = req.params; // Get the current user ID from the URL parameters
        console.log("watfsdafda");
        try {
            // Find users that the current user is following
            const followedUsers = await Follow.findAll({
                where: { follower_id: user_id },
                attributes: ['followed_id']
            });

            // Extract followed user IDs
            const followedUserIds = followedUsers.map(follow => follow.followed_id);

            // If no followed users, return an empty array
            if (followedUserIds.length === 0) {
                return res.json({ status: 'OK', reviews: [] });
            }

            // Fetch reviews by followed users
            const reviews = await db.Review.findAll({
                where: {
                    user_id: followedUserIds
                },
                include: [{ model: db.User, attributes: ['username'] }, {model: db.Book}],
                order: [['created_at', 'DESC']] // Order by most recent reviews
            });

            res.json({ status: 'OK', reviews });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });




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
