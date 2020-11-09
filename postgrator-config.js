require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DB_URL,
}