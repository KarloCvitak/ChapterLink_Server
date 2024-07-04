const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Received token:', token);

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.error('Failed to verify token:', err);
            return res.status(403).json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        } else {
            console.log('Decoded token:', decoded);
            req.decoded = decoded;
            next();
        }
    });
};
