const express = require('express')
const xss = require('xss')
const CashSessionsService = require('./cash_sessions_service')
const path = require('path')
const UsersService = require('../users/users_service')

const cashSessionsRouter = express.Router()
const jsonParser = express.json()


const serializeCashSession = cash_session => ({
    cash_session_id: cash_session.cash_session_id,
    buyin: xss(cash_session.buyin),
    cashout: xss(cash_session.cashout),
    hours_played: xss(cash_session.hours_played),
    date: cash_session.date,
    user_id: cash_session.user_id
})

cashSessionsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        CashSessionsService.getAllSessions(knexInstance)
            .then(cash_sessions => {
                res.json(cash_sessions.map(serializeCashSession))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { buyin, cashout, hours_played, date, user_id } = req.body
        const newEntry = { buyin, cashout, hours_played, date, user_id }

        for (const [key, value] of Object.entries(newEntry))
            if (value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })

        newEntry.buyin = buyin
        newEntry.cashout = cashout
        newEntry.hours_played = hours_played
        newEntry.date = date
        newEntry.user_id = user_id

        CashSessionsService.insertCashSession(
            req.app.get('db'),
            newEntry
        )
            .then(entry => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${entry.cash_session_id}`))
                    .json(serializeCashSession(entry))
            })
            .catch(next)
    })

// these routes are for when user is logged in and we have access to their user_id
// GET all current user cash sessions
// POST session??? We have Post already in '/' endpoint
cashSessionsRouter
    .route('/:user_id/')
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
    // queries cash_session table for all entries with current user_id FK and returns them
    .get((req, res, next) => {
        CashSessionsService.getCashSessionsByUserId(
            req.app.get('db'),
            req.params.user_id
        )
            .then(cash_sessions => {
                res.json(cash_sessions.map(serializeCashSession))
            })
            .catch(next)
    })

// *************** QUESTION ********************
// another endpoint '/:user_id/:cash_session_id' ????
// this endpoint would be used to delete and update specific cash sessions
// or can we do this in '/:user_id' endpoint????


// individual route *

module.exports = cashSessionsRouter