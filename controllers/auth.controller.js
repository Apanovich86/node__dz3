// const User = require('../dataBase/User');
module.exports = {
    loginUser: (req, res, next) => {
        try {
            const {login} =req.body;

            res.json(`The user ${login} has successfully logged in`);
        } catch (e) {
            next(e);
        }
    },
};
