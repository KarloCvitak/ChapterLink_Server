const express = require('express');
const { User, Role, UserRole } = require('../models'); // Import the models
const verifyToken = require('../middlewares/verifyToken');

module.exports = () => {
    const userRolesRouter = express.Router();
    userRolesRouter.use(verifyToken);

    // Get roles for a specific user
    userRolesRouter.get('/:userId/roles', async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findByPk(userId, {
                include: {
                    model: Role,
                    through: { attributes: [] } // Exclude the UserRole fields
                }
            });

            if (user) {
                res.json({ status: 'OK', roles: user.Roles });
            } else {
                res.status(404).json({ status: 'Error', message: 'User not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Get all users and their roles
    userRolesRouter.get('/', async (req, res) => {
        try {
            const users = await User.findAll({
                include: {
                    model: Role,
                    through: { attributes: [] } // Exclude the UserRole fields
                }
            });
            res.json({ status: 'OK', users });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Add a role to a user
    userRolesRouter.post('/:userId/roles/:roleId', async (req, res) => {
        const { userId, roleId } = req.params;
        try {
            const user = await User.findByPk(userId);
            const role = await Role.findByPk(roleId);

            if (user && role) {
                await UserRole.create({ user_id: userId, role_id: roleId });
                res.json({ status: 'OK', message: 'Role added to user' });
            } else {
                res.status(404).json({ status: 'Error', message: 'User or role not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Remove a role from a user
    userRolesRouter.delete('/:userId/roles/:roleId', async (req, res) => {
        const { userId, roleId } = req.params;
        try {
            const result = await UserRole.destroy({
                where: {
                    user_id: userId,
                    role_id: roleId
                }
            });

            if (result) {
                res.json({ status: 'OK', message: 'Role removed from user' });
            } else {
                res.status(404).json({ status: 'Error', message: 'User role not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    // Update a user's roles
    userRolesRouter.put('/:userId/roles', async (req, res) => {
        const { userId } = req.params;
        const { roleIds } = req.body; // Array of role IDs
        try {
            const user = await User.findByPk(userId);

            if (user) {
                await UserRole.destroy({
                    where: { user_id: userId }
                });
                const userRoles = roleIds.map(roleId => ({ user_id: userId, role_id: roleId }));
                await UserRole.bulkCreate(userRoles);

                res.json({ status: 'OK', message: 'User roles updated' });
            } else {
                res.status(404).json({ status: 'Error', message: 'User not found' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'Error', message: e.message });
        }
    });

    return userRolesRouter;
};
