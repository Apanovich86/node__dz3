const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const {updateUserValidator} = require("../validators/user.validator");
const {compare} = require('../service/password.service');


module.exports = {
    checkLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw new Error('Email or password entered incorrectly');
            }
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
            if (req.body.password.length < 4 || req.body.password.length > 10) {
                throw new Error('Password must be longer than 4 and less than 10 characters');
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

    isAuthBodyValid: (req, res, next) => {
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
