const {DataTypes } = require('sequelize');
const db = require('./db')
const User = require('./users')

const Todos = db.define('todos',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    
    ischecked:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    freezeTableName:true,
})



User.hasMany(Todos,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull: false
    }
});


Todos.belongsTo(User);

Todos.sync({alter:true});

module.exports = Todos;