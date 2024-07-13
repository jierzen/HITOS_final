require('dotenv').config();
const jwt = require('jsonwebtoken');

const iniciarSesion = async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.SECRET);
    console.log(`Usuario ${email} ha iniciado sesión`);
    res.send({ token });
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  iniciarSesion
};