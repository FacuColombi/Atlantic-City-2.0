const mongoose = require('mongoose');
                
const { Schema, model} = mongoose

const schemaPropiedad = new Schema({
    type:{
        type: String,
        enum: ['CASA', 'APARTAMENTO'],
        default:'CASA',
        require: true
    },
    shortDescription: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    state:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    rooms: {
        type: Number,
        require: true
    },
    bathrooms: {
        type: Number,
        require: true
    }

});

module.exports = mongoose.model('propiedades', schemaPropiedad);

