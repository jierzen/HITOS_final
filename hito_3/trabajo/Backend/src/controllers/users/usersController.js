const { UsersCollection } = require('../../database/models/usersModel')


const add_user_controller = async (req, res, next) => {

    try {
        const { email, password, usermane, picture, user_id } = req.body
        const response = await UsersCollection.addUser(email, password, usermane, picture, user_id)

        res.send(response)

    } catch (error) {
        next(error)
    }
}

const update_user_controller = async (req, res, next) => {
    try {

        const { user_id } = req.params;
        const { email, password, usermane, picture} = req.body

        const response = await UsersCollection.updateUser(user_id, email, password, usermane, picture)

        res.json(response)

    } catch (error) {
        next(error)
    }
}

const delete_user_controller = async (req, res, next) => {
    try {

        const { user_id } = req.params;
        const response = await UsersCollection.deleteUser(user_id)

        res.json(response)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    update_user_controller,
    delete_user_controller,
    add_user_controller
}