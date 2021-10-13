const authRouter = require('express').Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {ADMIN, USER} = require('../configs');

authRouter.post('/login', userMiddleware.isAuthBodyValid, userMiddleware.checkUserRoles([ADMIN, USER]), userMiddleware.checkLoginMiddleware, authController.loginUser);

module.exports = authRouter;
