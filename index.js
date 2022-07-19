const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const router = require('./router');
app.use('/',router);

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`)
})
