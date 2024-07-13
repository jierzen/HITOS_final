const database = require('../dbConfig');
const bcrypt = require('bcryptjs');

const addUser = async (usuario) => {
  const { email, password, usermane, profile_picture } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  try {
    const consulta = "INSERT INTO users (email, password, usermane, profile_picture) values ($1, $2, $3, $4) RETURNING *";
    const values = [email, passwordEncriptada, usermane, profile_picture];
    const { rows } = await database.query(consulta, values);
    return { msg: 'Usuario registrado con éxito', user: rows[0] };
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

const verificarCredenciales = async ({ email, password }) => {
  const consulta = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const { rows: [usuario] } = await database.query(consulta, values);
  const { password: passwordEncriptada } = usuario;
  return bcrypt.compareSync(password, passwordEncriptada);
};

const updateUser = async (user_id, email, password, usermane, profile_picture) => {
  const passwordEncriptada = bcrypt.hashSync(password);
  try {
    const consulta = "UPDATE users SET email = $1, password = $2, usermane = $3, profile_picture = $4 WHERE user_id = $5 RETURNING *";
    const values = [email, passwordEncriptada, usermane, profile_picture, user_id];
    const result = await database.query(consulta, values);
    return result.rowCount ? { msg: 'Cambios guardados con éxito', data: result.rows[0] } : { msg: 'Error al actualizar el usuario', data: [] };
  } catch (error) {
    const err = new Error('Error en la consulta');
    err.msg = 'Bad Request';
    err.status = 400;
    err.origin = 'Database';
    err.model = 'user';
    err.details = error.message;
    throw err;
  }
};

const getUser = async () => {
  try {
    const consulta = "SELECT * FROM users";
    const { rows } = await database.query(consulta);
    return rows.length ? { msg: 'Todos los Usuarios', data: rows } : { msg: 'No hay Usuarios', data: [] };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (user_id) => {
  try {
    const consulta = "DELETE FROM users WHERE user_id = $1 RETURNING *";
    const values = [user_id];
    const result = await database.query(consulta, values);
    return result.rowCount ? { msg: 'Usuario Eliminado Correctamente 👌', data: result.rows[0] } : { msg: 'Error al eliminar el usuario 😥', data: [] };
  } catch (error) {
    const err = new Error('Error en la consulta');
    err.msg = 'Bad Request';
    err.status = 400;
    err.origin = 'Database';
    err.model = 'user';
    err.details = error.message;
    throw err;
  }
};

const UsersCollection = {
  updateUser,
  deleteUser,
  addUser,
  getUser,
  verificarCredenciales
};

module.exports = {
  UsersCollection
};