const express = require('express');
const app = express()
const port = 3000
const db = require('./db/db');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Test Connection
db.authenticate()
   .then(()=>console.log('db connected...'))
   .catch(err => console.log(err));


const router = require('./router/router');
app.use('/',router);

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
})