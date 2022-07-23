const db = require('../db');

const sql = 'CREATE TABLE IF NOT EXISTS todos (id INT, title VARCHAR(255), description VARCHAR(255), date DATE, ischecked BOOLEAN);'


const execute = (async(query)=>{
  db.query(query);
})

execute(sql);