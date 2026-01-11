const verifyToken = require('../middlewares/verifyToken');
const { User, Liste } = require('../models'); // Import models
const { Op } = require('sequelize'); // Import Sequelize operators

module.exports = (express) => {
    const searchRouter = express.Router();

    searchRouter.use(verifyToken);

    searchRouter.get('/users', async (req, res) => {
        console.log('Accessed /api/search/users');
        const query = `%${req.query.q}%`;
        try {
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { username: { [Op.like]: query } },
                        { email: { [Op.like]: query } }
                    ]
                }
            });
            res.json({ data: users });
        } catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({ status: 'Error', message: error.message });
        }
    });


    searchRouter.get('/lists', async (req, res) => {
        const query = `%${req.query.q}%`;
        try {
            const lists = await Liste.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: query } },
                        { description: { [Op.like]: query } }
                    ]
                }
            });
            res.json({ data: lists });
        } catch (error) {
            console.error('Error searching lists:', error);
            res.status(500).json({ status: 'Error', message: error.message });
        }
    });

    return searchRouter;
};
