require('dotenv').config()
const jwt = require('jsonwebtoken')
const usuariosModel = require('../database/models/usersModel')

const validarCredenciales = async (req, res, next) => {
  try {

    const credenciales = req.body
    const match = await usuariosModel.verificarCredenciales(credenciales)

    if(!match){
      throw {
        code: 401, 
        message: "No existe un usuario con estas credenciales"
      }
    }

    const {email} = req.body
    const token = jwt.sign({email}, process.env.SECRET)
    req.token = token
    next()

  } catch (error) {
    res.status(error.code).send(error)
  }
  
}

module.exports = validarCredenciales