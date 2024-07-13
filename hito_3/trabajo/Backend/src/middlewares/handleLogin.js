require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UsersCollection } = require('../database/models/usersModel');

const handleLoginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const passwordHash = await UsersCollection.getPasswordUserByEmail(email);

        const match = await bcrypt.compare(password, passwordHash);
        if (match) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            req.token = token;
            next();
        } else {
            res.status(403).json({ error: 'Error de credenciales' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLoginMiddleware
};