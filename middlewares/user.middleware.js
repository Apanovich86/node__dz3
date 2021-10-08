const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });

            if (userByEmail) {
                throw new Error('Email already exists');
            }
            if (req.body.password.length < 4 || req.body.password.length > 10) {
                throw new Error('Password must be longer than 4 and less than 10 characters');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
