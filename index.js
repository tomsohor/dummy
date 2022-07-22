const express = require('express');
const app = express()
const port = 3000
const HOST = '0.0.0.0'

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const router = require('./router');
app.use('/',router);

app.listen(port, HOST, () => {
  console.log(`Example app listening on port ${port}`)
})