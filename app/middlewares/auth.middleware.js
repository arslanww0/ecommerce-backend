const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Please login first'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Invalid token'
        });

    }
}

function admin(req, res, next) {

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Admin access only'
        });
    }

    next();
}

module.exports = {
    auth,
    admin
};