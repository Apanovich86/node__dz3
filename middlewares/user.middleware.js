const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const {updateUserValidator} = require("../validators/user.validator");
const {compare} = require('../service/password.service');
const {authValidator} = require('../validators/auth.validator');


module.exports = {
    isAuthBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email, password});
            req.user = user;

            await compare(password, user.password);

            next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
           const { error, value } = userValidator.createUserValidator.validate(req.body);

           if (error) {
               throw new Error(error.details[0].message);
           }

           req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const userById = await User.findById(user_id);

            if (!userById) {
                throw new Error('Such user does not exist');
            }

            req.user = userById;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUpdateUserValid: (req, res, next) => {
        try {
            const {error, value} = updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
