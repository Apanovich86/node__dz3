const authRouter = require('express').Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const actionTokenTypes = require('../configs/action-token-type.enum');

authRouter.post('/login', userMiddleware.isAuthBodyValid, userMiddleware.checkLoginMiddleware, authController.loginUser);
authRouter.post('/logout', userMiddleware.checkAccessToken, authController.logout);
authRouter.post('/refresh', userMiddleware.checkRefreshToken, authController.refresh);

authRouter.post('/password/forgot', authController.sendMailForgotPassword);
authRouter.post('/password/set', userMiddleware.isAuthBodyValid, userMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD));


module.exports = authRouter;
