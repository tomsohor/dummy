const express = require('express');
const router = express.Router();


//fs to access file system
const fs = require('fs');
var rawdata = fs.readFileSync('todo.json');
var data = JSON.parse(rawdata);

//Get Current Date 
let date_ob = new Date();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();


router.get('/', (req, res)=>{
    res.send(data);
})

router.post('/',(req, res)=>{
    var item = req.body;
    item["date"] = date + "-" + month + "-" + year
    data.push(item);
    fs.writeFile('todo.json',JSON.stringify(data),(err)=>{
        if (err) res.send(err);
        res.send('Item Added...')
    })
})

module.exports = router;