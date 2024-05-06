const mongoose = require('mongoose');
                
const { Schema, model} = mongoose

const schemaUsuario = new Schema({
    
    firstName:{
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: [true, `Ya existe un usuario con es emailx`]
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('usuarios', schemaUsuario);

