require('dotenv').config();
const express = require('express')
const routes = require('./routes/index');
const cors = require('cors')
const morgan = require('morgan');
const { handleErrors } = require('./middlewares/errorsHandler');
const HandleDatabaseLogs = require('./middlewares/logsMiddleware');
const jwt =require('jsonwebtoken');

const app = express();

// middlewares
app.use(express.json());

app.use(morgan('dev'))

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// routes
app.use('/api', HandleDatabaseLogs, routes)

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


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Consultar el usuario por email en la base de datos
      const query = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(query, [email]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      // Comparar la contraseña con la almacenada en la base de datos
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      // Generar el token JWT
      const token = jwt.sign(
        { email: user.email, username: user.username, isAdmin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Devolver el token como respuesta
      res.json({ token });
    } catch (error) {
      console.error('Error en login:', error.message);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });


app.post("/api/registrarse", async (req, res) => {
    try {
    const { email, password } = req.body
    await verificarCredenciales(email, password, rol, lenguage)
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


