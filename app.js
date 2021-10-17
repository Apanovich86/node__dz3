const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const {ErrorHandler, errors} = require('./errors');

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_CONNECT_URL);

const {authRouter, userRouter} = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res, next) => {
res
    .status(err.status || ErrorHandler(errors.INTERNAL_SERVER_ERROR.code))
    .json({
    message: err.message
})
});

app.listen(PORT, () => {
    console.log(process.env);
    console.log(`App listen ${PORT}`);
});

