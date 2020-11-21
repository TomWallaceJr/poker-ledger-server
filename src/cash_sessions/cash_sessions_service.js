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

    // this service method will return all cash sessions for the current user using user_id FK
    // not sure how to implement this yet
    getCashSessionsByUserId(knex, user_id) {
        return knex
            .from('cash_sessions')
            .select('*')
            .where('user_id', user_id)
            .orderBy('date')
    },

    deleteCashSession(knex, id) {
        return knex
            .from('cash_sessions')
            .where('cash_session_id', id)
            .delete()
    },

    updateCashSession(knex, id, newFields) {
        return knex('cash_sessions')
            .where('cash_session_id', id)
            .update(newFields)
    }
}

module.exports = CashSessionsService