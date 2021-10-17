const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');
const errorStatus = 500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_CONNECT_URL);

const {authRouter, userRouter} = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res, next) => {
res
    .status(err.status || errorStatus)
    .json({
    message: err.message
})
});

app.listen(PORT, () => {
    console.log(process.env);
    console.log(`App listen ${PORT}`);
});

