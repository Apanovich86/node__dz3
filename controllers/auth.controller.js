const User = require('../dataBase/User');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: `User ${email} not found`});
            }
            if (password !== user.password){
                return res.status(400).json({message: 'You entered an incorrect password'});
            }

            res.json('The user has successfully logged in');
        } catch (e) {
            res.status(400).json({message: 'Login error'});
        }
    },
};
