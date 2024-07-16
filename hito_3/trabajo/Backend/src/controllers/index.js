const bcrypt = require('bcrypt');


const GetUsuarios = async () => {
    try {
        // Usamos 'database' en lugar de 'pool'
        const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

const verificarCredenciales = async (email, password) => {
    try {
        const values = [email];
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        
        // Usamos 'database' en lugar de 'pool'
        const { rows: [usuario], rowCount } = await pool.query(consulta, values);

        if (!usuario) {
            throw { code: 401, message: "Email o contraseña incorrecta" };
        }

        const { password: passwordEncriptada } = usuario;
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

        if (!passwordEsCorrecta || !rowCount) {
            throw { code: 401, message: "Email o contraseña incorrecta" };
        }
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        throw error;
    }
}

// Función para registrar un usuario
const registrarUsuario = async (usuario) => {
    try {
        let { email, password, rol, lenguage } = usuario;
        const passwordEncriptada = bcrypt.hashSync(password, 10);
        
        // Actualizamos la variable 'password' por 'passwordEncriptada' para mantener consistencia
        const values = [email, passwordEncriptada, rol, lenguage];
        const consulta = "INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4)";
        
        // Usamos 'database' en lugar de 'pool'
        await pool.query(consulta, values);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
} 


module.exports ={GetUsuarios, verificarCredenciales ,registrarUsuario, }

