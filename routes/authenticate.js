const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User, Role, UserRole } = require('../models'); // Import the necessary models

module.exports = (express) => {
    const authRouter = express.Router();

    authRouter.post('/register', async (req, res) => {
        const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = {
            username: req.body.username,
            password_hash: passwordHash,
            email: req.body.email
        };

        try {
            const newUser = await User.create(user);

            // Assign default role (assuming role_id 1 is the default user role)
            const defaultRole = await Role.findOne({ where: { role_name: 'User' } });
            if (defaultRole) {
                await UserRole.create({ user_id: newUser.user_id, role_id: defaultRole.role_id });
            }

            res.json({ status: 'OK', insertId: newUser.user_id });
        } catch (e) {
            console.error('Error during registration:', e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Login endpoint
    authRouter.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        try {
            const user = await User.findOne({
                where: { email },
                include: [{
                    model: Role,
                    through: { attributes: [] }
                }]
            });

            if (user && user.password_hash === passwordHash) {
                const roles = user.Roles.map(role => role.role_name);
                const token = jwt.sign({
                    id: user.user_id,
                    email: user.email,
                    roles
                }, config.secret, { expiresIn: '24h' });

                res.json({ status: 'OK', token });
            } else {
                res.status(401).json({ status: 'Error', message: 'Invalid credentials' });
            }
        } catch (e) {
            console.error('Error during login:', e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Endpoint to check if username or email is already in use
    authRouter.post('/check-username-email', async (req, res) => {
        const { username, email } = req.body;

        try {
            const usernameInUse = await User.count({ where: { username } });
            const emailInUse = await User.count({ where: { email } });

            res.json({
                usernameInUse: usernameInUse > 0,
                emailInUse: emailInUse > 0
            });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return authRouter;
};
