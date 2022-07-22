const { Pool } = require('node-postgres');
 
const client = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'restapi',
    password: 'password',
    port: 5432
  });
  
module.exports = client;


