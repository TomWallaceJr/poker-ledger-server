const express = require('express')
const xss = require('xss')
const UsersService = require('./users_service')
const path = require('path')

const usersRouter = express.Router()
const jsonParser = express.json()

// use xss to defend from malicious user input
const serializeUser = user => ({
    user_id: user.user_id,
    username: xss(user.username),
    password: xss(user.password),
    email: xss(user.email)
})

usersRouter
    .route('/')
    // we wont be using get request for users im just getting endpoints 
    // to work right now
    // MAYBE we will as an admin??
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { username, password, repeatPassword, email } = req.body
        const newUser = { username, password, email }

        // if no username, password, or email entered return 400 and error message
        // Brute force for now .... DRY principles later using loop with key/value pairs
        for (const [key, value] of Object.entries(newUser))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        // checks if password and repeat password match
        if (password != repeatPassword) {
            return res.status(400).json({
                error: { message: `Passwords must match!` }
            })
        }

        newUser.password = password;
        newUser.email = email;

        // insert user into database through users-service
        UsersService.insertUser(
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res
                    .status(201)
                    // not clear on path.posix copied from previous code
                    .location(path.posix.join(req.originalUrl, `/${user.user_id}`))
                    .json(serializeUser(user))
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    // .all means when a HTTP req is made this code will run first
    .all((req, res, next) => {
        UsersService.getById(
            req.app.get('db'),
            req.params.user_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User does not exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    // simple get request will respond with user info
    .get((req, res, next) => {
        res.json(serializeUser(res.user))
    })
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(numRowsAffected => {
                res.status(204)
                    .end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        // deconstructs object proeprties from request body and creates variable for updated info
        const { username, password, email } = req.body
        const userToUpdate = { username, password, email }

        // checks to see if name of any of key value pairs are username password or email
        const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'user_username', 'user_password' or 'user_email'`
                }
            })

        UsersService.updateUser(
            req.app.get('db'),
            req.params.user_id,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })




module.exports = usersRouter