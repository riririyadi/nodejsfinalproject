const sequelize = require("../database/connection");
const {  Model, DataTypes } = require("sequelize");


const User = sequelize.define('user', {
    username : {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

const Note = sequelize.define('note', {
    title : {
        type: DataTypes.STRING,
        allowNull:false,
    },
    body : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const NoteSharing = sequelize.define('note_sharing',{
    noteId : {
        type: DataTypes.INTEGER,
        references:{
            model: Note,
            key: 'id',
        }
    },
    userId : {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id',
        }
    }

})




function syncDB() {
    User.hasMany(Note)
    Note.belongsTo(User)
    User.belongsToMany(Note, { through: NoteSharing });
    Note.belongsToMany(User, { through: NoteSharing });
    sequelize.sync({alter: true}).then((data) => {
        console.log('Table and model synced successfully')
    }).catch((err) =>{
        console.log('Error syncing table and model')
    
    })
}


module.exports = {
    syncDB,User, Note, NoteSharing
}