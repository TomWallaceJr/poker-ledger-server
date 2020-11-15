const express = require('express')
const xss = require('xss')
const CashSessionsService = require('./cash_sessions_service')
const path = require('path')

const cashSessionsRouter = express.Router()
const jsonParser = express.json()


const serializeCashSession = cash_session => ({
    cash_session_id: cash_session.cash_session_id,
    cash_session_buyin: xss(cash_session.cash_session_buyin),
    cash_session_cashout: xss(cash_session.cash_session_cashout),
    cash_session_hours_played: xss(cash_session.cash_session_hours_played),
    cash_session_date: cash_session.cash_session_date,
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
module.exports = cashSessionsRouter