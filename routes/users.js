//middleware za verifikaciju
const verifyToken = require('../middlewares/verifyToken');
//modeli korišteni za rute
const { User, Follow } = require('../models');

//export modula
module.exports = (express) => {

    //instanciranje express.Router() za users.js
    const usersRouter = express.Router();

    //korištenje middleware-a za ovu rutu
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
        .delete(async (req, res) => {
            try {
                const deletedUser = await User.destroy({ where: { id: req.params.id } });
                res.json({ status: 'OK', affectedRows: deletedUser });
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });

    usersRouter.route('/:id')
        .put(async (req, res) => {
            const { username } = req.body;
            console.log({username});
            const userId = req.params.id;

            if (!username) {
                return res.status(400).json({ status: 'Error', message: 'Username is required' });
            }

            try {
                // Find the user to ensure they exist
                const user = await User.findByPk(userId);
                if (!user) {
                    return res.status(404).json({ status: 'Error', message: 'User not found' });
                }

                // Update the username
                const [updatedRows] = await User.update({ username }, { where: { user_id: userId } });

                if (updatedRows > 0) {
                    res.json({ status: 'OK', message: 'Username updated successfully' });
                } else {
                    res.status(400).json({ status: 'Error', message: 'No changes made' });
                }
            } catch (e) {
                console.error(e);
                res.status(500).json({ status: 'Error', message: e.message });
            }
        });
    return usersRouter;
};
