const User = require('../dataBase/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            res.json('The user has successfully logged in');
        } catch (e) {
            res.json(e.message);
        }
    },
};
