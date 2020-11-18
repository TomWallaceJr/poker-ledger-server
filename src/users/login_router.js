const express = require('express')
const UsersService = require('./users_service')

const loginRouter = express.Router()
const jsonParser = express.json()


loginRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { username, password } = req.body


        UsersService.userLogin(
            req.app.get('db'),
            username,
            password
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User does not exist or wrong password!` }
                    })
                }
                res.user = user
                res.json(user)
                next()
            })
            .catch(next)
    })

module.exports = loginRouter