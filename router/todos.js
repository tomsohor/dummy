const express = require('express');
const router = express.Router();

//import db
const db = require('../db/db');
const todos = require('../db/todos');
const users = require('../db/users');



//get todo list
router.get('/', async(req, res)=>{
    const query = req.query;
    if (Object.keys(query).length === 0){
        todos.findAll()
          .then(todos=>res.send(todos))
          .catch(err => console.log(err));
    }else{
        console.log(req.params)
        todos.findAll({where:query})
          .then(todos=>todos.length==0?res.send('No item Found'):res.send(todos))
          .catch(err => console.log(err));
    }  
})



//add new todo
router.post('/',async(req, res)=>{
    const user = await users.findOne({where:{username:'kanya'}})
    console.log(user)

    const todo = {
        userId:user.id,
        title:req.body.title,
        description:req.body.desc,
        ischecked: false,
    }
    await todos.create(todo)
      .then(()=> res.send('todo added...'))
      .catch(err=>console.log(err))
  
       
})


//update todo
router.put('/:id',async(req,res)=>{
    var id = req.params;
    var item = req.body;
    if (Object.keys(item).length !== 0){
        todos.update(item,{where:id})
          .then(()=> res.send('update successfully'))
          .catch(err=>console.log(err));
    }else{
        todos.update(item,{where:id})
          .then(()=> res.send('Nothing is updated.....'))
          .catch(err=>console.log(err));
    }
})

//delete todo 
router.delete('/:id',async(req,res)=>{
    var id = req.params;
    todos.destroy({where:id})
      .then(()=>res.send(`item ${id.id} is deleted...`))
      .catch(err=>console.log(err))
   
})

module.exports = router;