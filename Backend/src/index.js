const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
app = express();
const puerto = process.env.PORT || 9000;
const rutaDePropiedades = require('./rutas/propiedad')
const rutasDeUsuario = require("./rutas/usuario");

app.use(express.json());
app.use(cors());
app.use('/', rutasDeUsuario)
app.use('/', rutaDePropiedades)
//Rutas

app.get('/', (req, res) => {
    res.send('Bienvenido');
});

//Coneccion

mongoose
    .connect(process.env.Uri_MongdoDB)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error(error));

app.listen(puerto, () => console.log(`Servidor en el puerto ${puerto}`)); 