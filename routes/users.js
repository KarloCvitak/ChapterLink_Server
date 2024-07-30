const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');
const { User, Follow } = require('../models'); // Import the User and Follow models

module.exports = (express) => {
    const usersRouter = express.Router();

    usersRouter.use(verifyToken);

    usersRouter.route('/')
        .get(async (req, res) => {
            try {
                const users = await User.findAll();
                res.json({ status: 'OK', users });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    usersRouter.route('/:id')
        .get(async (req, res) => {
            try {
                const user = await User.findByPk(req.params.id);
                if (user) {
                    console.log(`User ID: ${user.user_id}`); // Debug statement
                    const followersCount = await Follow.count({
                        where: { followed_id: user.user_id }
                    });
                    console.log(`Followers Count: ${followersCount}`); // Debug statement
                    res.json({ status: 'OK', user: { ...user.toJSON(), followersCount } });
                } else {
                    res.status(404).json({ status: 'Error', message: 'User not found' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .put(async (req, res) => {
            const user = req.body;
            try {
                const updatedUser = await User.update(user, { where: { id: req.params.id } });
                res.json({ status: 'OK', changedRows: updatedUser[0] });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        })
        .delete(async (req, res) => {
            try {
                const deletedUser = await User.destroy({ where: { id: req.params.id } });
                res.json({ status: 'OK', affectedRows: deletedUser });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    return usersRouter;
};
