const express = require('express');
const router = express.Router();

//import db
const db = require('./db')


//Get Current Date 
let date_ob = new Date();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();


//get todo list
router.get('/', async(req, res)=>{
    const query = req.query;
    var items = await db.query('SELECT * from todos').then(r=>r.rows).catch(e=>console.log(e));
    if (Object.keys(req.query).length === 0){
        res.send(items)
    }else{
        for (const key in query) {
        // convert to String to check with query since query is type string
          var items = items.filter(i=>String(i[key])==query[key])  
        }
        res.send(items)
    }  
})


//get todo details
router.get('/:id', async(req, res)=>{
    var {id} = req.params;
    const item = await db.query(`SELECT * FROM todos WHERE id = ${id}`).then(r=>r.rows).catch(e=>console.log(e));
    if(item == 0){
        res.send('No Item Found .....')
    }else{
        res.send(item)
    }
   
})


//add new todo
router.post('/',async(req, res)=>{
    try {
        const {title,desc} = req.body;
        const id = Math.floor(Math. random() * 10000)
        const todayDate =year+ "-" + month + "-"+ date 
        const ischecked = false
        await db.query(`INSERT INTO todos(id, title, description, date, ischecked) VALUES('${id}', '${title}', '${desc}', '${todayDate}', '${ischecked}')`);
        res.send("Item added....")
    } catch (error) {
        console.log(error)
    }
       
})


//update todo
router.put('/:id',async(req,res)=>{
    var {id} = req.params;
    var {title,desc,ischecked} = req.body;
    var todayDate = year+ "-" + month + "-"+ date 
    const item = await db.query(`SELECT * FROM todos WHERE id = ${id}`).then(r => r.rows)
    if (item == 0){
        res.send('No Item found')
    }else{
        if(title){
            await db.query(`UPDATE todos SET title = '${title}' WHERE id = '${id}'`)
        }
        if(desc){
            await db.query(`UPDATE todos SET description = '${desc}' WHERE id = '${id}'`)
        }
        if(ischecked){
            await db.query(`UPDATE todos SET ischecked = '${ischecked}' WHERE id = '${id}'`)
        }
        await db.query(`UPDATE todos SET date = '${todayDate}' WHERE id = '${id}'`)
        res.send('Item Updated....')
    
}})

//delete todo 
router.delete('/:id',async(req,res)=>{
    var {id} = req.params;
    const item = await db.query(`SELECT * FROM todos WHERE id = ${id}`).then(r => r.rows)
    if (item == 0){
        res.send('No Item found....')
    }else{
        await db.query(`DELETE FROM todos WHERE id = '${id}'`)
        res.send('Item Deleted....')
    }
    
})

module.exports = router;