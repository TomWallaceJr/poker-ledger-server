require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const jwt = require('jsonwebtoken');

const usersRouter = require('./users/users_router')
const cashSessionsRouter = require('./cash_sessions/cash_sessions_router')



const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// Endpoints moved to routers
app.use('/api/users', usersRouter)
app.use('/api/cash_sessions', cashSessionsRouter)

// app.get('/', (req, res) => {
//     res.send('Hello, boilerplate!');
// });

// error handling middleware
app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;