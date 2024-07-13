require('dotenv').config();
const express = require('express')
const routes = require('./routes/index');
const cors = require('cors')
const morgan = require('morgan');
const { handleErrors } = require('./middlewares/errorsHandler');
const { handleRequestLogs } = require('./middlewares/logs.middleware');
const { FRONT_URL } = process.env

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
  origin: FRONT_URL
}))

// routes
app.use('/api', handleRequestLogs, routes)

// Handle errors
app.use(handleErrors)

app.get("/api/users/perfil", async (req, res)=> {
  try{
      const usuarios= await getUsuarios()
      res.json(usuarios)
  } catch(error){
  res.status(error.code || 500).send(error)
  }
})

app.get('/api/users/login'), async(req, res)=> {
  try{
      const usuarios= await getUserByEmail()
      res.json(usuarios)
  } catch(error){
  res.status(error.code || 500).send(error)
  }
}



app.post("/api/users/registrarse", async (req, res) => {
  try {
  const { email, password } = req.body
  await verificarCredenciales(email, password)
  const token = jwt.sign({ email }, process.env.JWT_SECRET , { expiresIn: 60 })
  res.send(token)
  } catch (error) {
  console.log(error)
  res.status(error.code || 500).send(error)
  }
  })
  
app.post("/api/users/registrarse", async (req, res) => {
  try {
  const usuario = req.body
  await registrarUsuario(usuario)
  res.send("Usuario creado con éxito")
  } catch (error) {
  res.status(500).send(error)
  }
  })

module.exports = app;


