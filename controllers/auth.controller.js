const User = require('../dataBase/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {login} =req.body;

            res.json(`The user ${login} has successfully logged in`);
        } catch (e) {
            res.json(e.message);
        }
    },
};
