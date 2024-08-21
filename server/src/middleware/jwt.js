const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Invalid token');
    }
};

module.exports = verifyJWT;
