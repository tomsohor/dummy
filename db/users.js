const { UUIDV4 } = require('sequelize');
const {DataTypes } = require('sequelize');
const db = require('./db')

const User = db.define('users',{
    id:{
        type:DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    freezeTableName:true,
})

User.sync({alter:true});


module.exports = User;