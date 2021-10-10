const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}).lean();

            const normUsers = users.map(value => userUtil.userNormalizator(value));

            res.json(normUsers);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try{
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();

            const normalizedUser = userUtil.userNormalizator(user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { user_id } = req.params;
            const updateUser = await User.findByIdAndUpdate(user_id, req.body);

            res.json(updateUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const delUser = await User.findByIdAndDelete(user_id);

            res.json(delUser);
        } catch (e) {
            res.json(e.message);
        }
    }
};
