const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();

            const normUsers = users.map(value => userUtil.userNormalizator(value));

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try{
            const user = req.user;

            const normUsers = userUtil.userNormalizator(user);

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normUsers = userUtil.userNormalizator(newUser);

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const updateUser = await User.findByIdAndUpdate(user_id, req.body);

            const normUsers = userUtil.userNormalizator(updateUser);

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const delUser = await User.findByIdAndDelete(user_id);

            const normUsers = userUtil.userNormalizator(delUser);

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    }
};
