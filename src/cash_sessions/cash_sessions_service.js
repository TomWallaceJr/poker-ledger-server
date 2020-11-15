const CashSessionsService = {
    getAllSessions(knex) {
        return knex
            .select('*')
            .from('cash_sessions')
    }
}

module.exports = CashSessionsService