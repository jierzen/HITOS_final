const { UsersCollection } = require('../../database/models/usersModel');

const add_user_controller = async (req, res, next) => {
  try {
    const usuario = req.body;
    const result = await UsersCollection.addUser(usuario);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.detail);
  }
};

const update_user_controller = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { email, password, usermane, profile_picture } = req.body;
    const response = await UsersCollection.updateUser(user_id, email, password, usermane, profile_picture);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const get_user_controller = async (req, res, next) => {
  try {
    const response = await UsersCollection.getUser();
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const delete_user_controller = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await UsersCollection.deleteUser(user_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  update_user_controller,
  delete_user_controller,
  add_user_controller,
  get_user_controller
};