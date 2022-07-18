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

//get todo list
router.get('/', (req, res)=>{
    res.send(data);
})


//get todo details
router.get('/:id', (req, res)=>{
    var {id} = req.params;
    var item = data.find(item => item.id == parseInt(id))
    if (item == undefined){
        res.send('Item not found......');
    }else{
        res.send(item)
    }
    
})

//add new todo
router.post('/',(req, res)=>{
    var item = req.body;
    item["id"] = Object.keys(data).length + 1
    item["date"] = date + "-" + month + "-" + year
    item["ischecked?"] = false
    data.push(item);
    fs.writeFile('todo.json',JSON.stringify(data),(err)=>{
        if (err) res.send(err);
        res.send('Item Added...')
    })
})

//update todo
router.put('/:id',(req,res)=>{
    var {id} = req.params;
    var {title,desc,ischecked} = req.body;
    console.log(id)
    var index = data.findIndex(i=>i.id == id)
    if (index == -1){
        res.send('Unexisting Item....')
    }else{
        if(title){
            data[index]['title'] = title
        }
        if(desc){
            data[index]['desc'] = desc
        }
        if(ischecked){
            data[index]['ischecked?'] = ischecked
        }
        data[index]['date'] = date + "-" + month + "-" + year
        fs.writeFile('todo.json',JSON.stringify(data),(err)=>{
            if (err) res.send(err);
            res.send('Item Updated....')
        })
    }
})

//delete todo 
router.delete('/:id',(req,res)=>{
    var {id} = req.params;
    console.log(id)
    var index = data.findIndex((item)=>{
        return item.id === parseInt(id)
    })
    
    if (index == -1){
        res.send('No item found!!!')
    }else{
        data.splice(index,1)
        fs.writeFile('todo.json',JSON.stringify(data),(err)=>{
            if (err) res.send(err);
            res.send('Item Deleted...')
        })
    }
    
})

module.exports = router;