const CashSessionsService = {
    getAllSessions(knex) {
        return knex
            .select('*')
            .from('cash_sessions')
    },

    insertCashSession(knex, newEntry) {
        return knex
            .insert(newEntry)
            .into('cash_sessions')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = CashSessionsService