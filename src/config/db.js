const { Pool } = require('pg');

module.exports = new Pool({
    user: 'postgres',
    password:'34815461',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})

