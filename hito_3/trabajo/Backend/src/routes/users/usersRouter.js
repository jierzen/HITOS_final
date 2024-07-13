const { get_user_controller, add_user_controller, update_user_controller, delete_user_controller } = require('../../controllers/users/usersController');

const router = require('express').Router();


router.get('/get-all', get_user_controller);
router.post('/create', add_user_controller);
router.put('/update/:user_id', update_user_controller);
router.delete('/delete/:user_id', delete_user_controller);

module.exports = router;