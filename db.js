const { Pool } = require('node-postgres');


const client = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'restapi',
  password: 'password',
  port: 5432
});

module.exports = client;


