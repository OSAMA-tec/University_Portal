const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('something wrong with auth middleware', err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
const authAdmin = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_Admin);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('something wrong with auth middleware', err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = {auth,authAdmin};