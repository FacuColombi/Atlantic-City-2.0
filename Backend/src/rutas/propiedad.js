const express = require('express');
const ModeloPropiedad = require('../modelos/ModeloPropiedad.js');
const router = express.Router();
const ModeloResponse = require('../modelos/ModeloResponse.js')
const SesionUsuarios = require('../middleware/sesionUsuario.js')

//Crear propiedad

router.post('/propiedad', (req, res) => {
    if(!SesionUsuarios.obtenerSesionActual()) return res.json(new ModeloResponse('Credenciales no autorizadas', true))
    const { type, shortDescription, description, state, price, rooms, bathrooms } = req.body;
    if(!type || !shortDescription ||!description || !state || !price || !rooms || !bathrooms) return res.json(new ModeloResponse('Llene todos los campos', true))
    const instanciaPropiedad = new ModeloPropiedad({
        type: type,
        shortDescription: shortDescription,
        description: description,
        state: state,
        price: price,
        rooms: rooms,
        bathrooms: bathrooms
    });

    instanciaPropiedad.save()
        .then(() => {
            return res.status(201).json(new ModeloResponse(`Se creo la propiedad`));
        })
        .catch((error) => {
            return res.status(400).json(new ModeloResponse(error, true));
        });
});

//Funcionando 

// ====================================



// Traer todas las propiedades

router.get('/propiedad', (req, res) => {
    if(!SesionUsuarios.obtenerSesionActual()) return res.json(new ModeloResponse('Credenciales no autorizadas', true))
    ModeloPropiedad
        .find(req.query)
        .then((data) => res.json(new ModeloResponse('Estas son todas las propiedades', false, data)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================

// Encontrar propiedad 

router.get('/propiedad/:id', (req, res) => {
    if(!SesionUsuarios.obtenerSesionActual()) return res.json(new ModeloResponse('Credenciales no autorizadas', true))
    const {id} = req.params;
    ModeloPropiedad
        .findOne({ _id : id })
        .then((data) => res.json(new ModeloResponse('Se encontro la propiedad', false, data)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================


//Borrar propiedad

router.delete('/propiedad/:id', (req, res) => {
    if(!SesionUsuarios.obtenerSesionActual()) return res.json(new ModeloResponse('Credenciales no autorizadas', true))
    const {id} = req.params;
    ModeloPropiedad
        .deleteOne({ _id : id })
        .then((data) => res.json(new ModeloResponse('Se borro la propiedad', false, data)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================


//Actualizar propiedad

router.put('/propiedad/:id', (req, res) => {
    if(!SesionUsuarios.obtenerSesionActual()) return res.json(new ModeloResponse('Credenciales no autorizadas', true))
    const {id} = req.params;
    const { type, shortDescription, description, state, price, rooms, bathrooms } = req.body;
    ModeloPropiedad
        .updateOne({ _id: id }, { $set: { type, shortDescription, description, state, price, rooms, bathrooms } })
        .then((data) => res.json(new ModeloResponse('Se modifico la propiead correctamente')))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================

module.exports = router;