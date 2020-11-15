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
    },

    getByUserId(knex, user_id) {
        return knex
            .from('cash_sessions')
            .select('*')
            .where('user_id', user_id)
    }
}

module.exports = CashSessionsService