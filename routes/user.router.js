const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserBodyValid, userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.checkUserById, userController.getUserById);
router.put('/:user_id', userMiddleware.isUpdateUserValid, userMiddleware.checkUserById, userController.updateUser);
router.delete('/:user_id', userMiddleware.checkUserById, userController.deleteUser);

module.exports = router;
