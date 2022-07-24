const {DataTypes } = require('sequelize');
const db = require('./db')

const Todos = db.define('todo',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ischecked:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

Todos.sync();

module.exports = Todos;