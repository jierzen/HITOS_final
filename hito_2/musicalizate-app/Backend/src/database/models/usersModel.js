const database = require('../dbConfig');


const addUser = async (email, password, usermane, picture) => {

    try {

        const consulta = "INSERT INTO User (email, password, usermane, picture) values ($1, $2, $3, $4) RETURNING *"
        const values = [email, password, usermane, picture]
        
        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Usuario agregado ✅',
                data: result.rows[0]
            }

        } else {
            return {
                msg: 'Usuario no agregado ⚠️',
                data: []
            }
        }

    } catch (error) {
        throw error
    }

}

const updateUser = async (email, usermane, picture, user_id) => {

    try {

        const consulta = "UPDATE User SET email = $1, usermane = $2, picture = $3 WHERE user_id = $4 RETURNING *";
        const values = [email, usermane, picture, user_id]

        const result = await database.query(consulta, values)


        if (result.rowCount) {

            return {
                msg: 'Cambios guardados con éxito',
                data: result.rows[0]
            }
        } else {
            return {
                msg: 'Error al actualizar el usuario',
                data: []
            }
        }



    } catch (error) {
        const err = new Error('Error en la consulta');

        err.msg = 'Bad Request'
        err.status = '400'
        err.origin = 'Database'
        err.model = 'user'
        err.details = error.message

        throw err;
    }
}

const deleteUser = async (user_id) => {

    try {

        const consulta = "DELETE FROM User WHERE user_id = $1 RETURNING *";
        const values = [user_id]

        const result = await database.query(consulta, values)


        if (result.rowCount) {

            return {
                msg: 'Usuario Eliminado Correctamente 👌',
                data: result.rows[0]
            }
        } else {
            return {
                msg: 'Error al eliminar el usuario 😥',
                data: []
            }
        }



    } catch (error) {
        const err = new Error('Error en la consulta');

        err.msg = 'Bad Request'
        err.status = '400'
        err.origin = 'Database'
        err.model = 'user'
        err.details = error.message

        throw err;
    }
}


const UsersCollection = {
    updateUser,
    deleteUser,
    addUser
}



module.exports = {
    UsersCollection
}