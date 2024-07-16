require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authorization.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ error: "Malformed token" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { email: decodedToken.email };
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = {
    authMiddleware
};
