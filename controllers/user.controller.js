const { WELCOME, UPDATE_USER, DELETE_USER } = require('../configs');
const {User} = require('../dataBase');
const {passwordService, emailService} = require('../service');
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

    getUserById: (req, res, next) => {
        try {
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

            await emailService.sendMail(req.body.email, WELCOME, { userName: req.body.name });

            const normUsers = userUtil.userNormalizator(newUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            const updateUser = await User.findByIdAndUpdate(user_id, {name}, {new: true});

            await emailService.sendMail(req.body.email, UPDATE_USER, { userName: name });

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

            await emailService.sendMail(req.body.email, DELETE_USER, { userName: name });

            const normUsers = userUtil.userNormalizator(delUser.toObject());

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    }
};
