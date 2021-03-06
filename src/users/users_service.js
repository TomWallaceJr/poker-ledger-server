const UsersService = {
    getAllUsers(knex) {
        return knex
            .select('*')
            .from('users')
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex
            .from('users')
            .select('*')
            .where('user_id', id)
            .first()
    },

    deleteUser(knex, id) {
        return knex
            .from('users')
            .where('user_id', id)
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('users')
            .where('user_id', id)
            .update(newUserFields)
    },

    userLogin(knex, username, password) {
        return knex
            .select('username', 'password', 'user_id')
            .from('users')
            .where('username', username)
            .where('password', password)
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = UsersService