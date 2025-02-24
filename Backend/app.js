const express = require('express');
const authRouter = require('./router/authRoute');
const databaseconnect = require('./config/databaseConfig');

const app = express();

databaseconnect();

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/', function (req, res) {
    res.status(200).json({
        data: "JWTAuth server"
    })
})

module.exports = app;