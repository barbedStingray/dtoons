/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/


const pg = require('pg');

let pool;

if (process.env.POSTGRES_URL_NO_SSL) {
    console.log('Postgres URL', process.env.POSTGRES_URL_NO_SSL);

    pool = new pg.Pool({
        connectionString: process.env.POSTGRES_URL_NO_SSL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}


// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)

else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'dtoon_game',   // name of your database!
    });
}

module.exports = pool;