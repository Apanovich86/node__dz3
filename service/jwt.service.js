const jwt = require('jsonwebtoken');

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');
const {tokenTypeEnum} = require('../configs');
const {ErrorHandler, INVALID_TOKEN, errors} = require('../errors');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, 'JWT_ACCESS_SECRET', {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);

        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.code);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = 'HELLO';
                break;
            default:
                throw new ErrorHandler(errors.WRONG_TOKEN_TYPE.message, errors.WRONG_TOKEN_TYPE.code);
        }
       return jwt.sign({}, 'JWT_ACCESS_SECRET', {expiresIn: '24h'});
    }
};
