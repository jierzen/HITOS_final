const router = require('express').Router();
const { iniciarSesion } = require('../../controllers/users/login.controller');
const { handleLoginMiddleware } = require('../../middlewares/handleLogin');

router.post('/login', handleLoginMiddleware, iniciarSesion);

module.exports = router;