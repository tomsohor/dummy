const express = require('express');
const router = express.Router();

//import db
const User = require('../db/users');



//get User list
router.get('/', async(req, res)=>{
    const query = req.query;
    if (Object.keys(query).length === 0){
        User.findAll()
          .then(users=>res.send(users))
          .catch(err => console.log(err));
    }else{
        console.log(req.params)
        User.findAll({where:query})
          .then(users=>users.length==0?res.send('No User Found'):res.send(users))
          .catch(err => console.log(err));
    }  
})



//add new User
router.post('/',async(req, res)=>{
    await User.create(req.body)
      .then(()=> res.send('User added...'))
      .catch(err=>console.log(err))
       
})


//update User
router.put('/:id',async(req,res)=>{
    var id = req.params;
    var item = req.body;
    if (Object.keys(item).length !== 0){
        User.update(item,{where:id})
          .then(()=> res.send('update successfully'))
          .catch(err=>console.log(err));
    }else{
        User.update(item,{where:id})
          .then(()=> res.send('nothing is updated'))
          .catch(err=>console.log(err));
    }
})

//delete User 
router.delete('/:id',async(req,res)=>{
    var id = req.params;
    User.destroy({where:id})
      .then(()=>res.send(`item ${id.id} is deleted...`))
      .catch(err=>console.log(err))
   
})

module.exports = router;