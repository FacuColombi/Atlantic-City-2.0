
const express = require('express');
const ModeloUsuario = require('../modelos/ModeloUsuario.js');
const SesionUsuario = require('../middleware/sesionUsuario.js')
const router = express.Router();
const ModeloResponse = require('../modelos/ModeloResponse.js')




// Crear usuarios 

router.post('/signup', (req, res) => {
    const nuevoFirstName = req.body.firstName;
    const nuevoLastName = req.body.lastName;
    const nuevoEmail = req.body.email;
    const nuevoPassword = req.body.password;

    ModeloUsuario.findOne({ email: nuevoEmail })
        .then((existEmail) => {
            if (existEmail) {
                return res.status(400).json(new ModeloResponse('El usuario ya existe',true));
            }

            const instanciaUsuario = new ModeloUsuario({
                firstName: nuevoFirstName, 
                lastName: nuevoLastName,
                email: nuevoEmail,
                password: nuevoPassword
            });

            instanciaUsuario.save()
                .then((isCreated) => {
                    SesionUsuario.guardarSesion()
                    return res.status(201).json(new ModeloResponse(`Se creo el usuario`));
                })
                .catch((error) => {
                    return res.status(400).json(new ModeloResponse(error, true));
                });
        })
        .catch((error) => {
            return res.status(400).json(new ModeloResponse(error, true));
        });

});

//Funcionando 

// ====================================




// Traer todos los usuarios

router.get('/usuarios', (req, res) => {
    ModeloUsuario
        .find()
        .then((data) => res.json(new ModeloResponse('Estas son todos los usuarios', false, data)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================




// Encontrar usuario 

router.get('/usuarios/:email', (req, res) => {
    const emailUsuario = req.params.email;
    ModeloUsuario
        .findOne({ email : emailUsuario })
        .then((data) => res.json(new ModeloResponse('Se encontro el usuario', false, data)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================



// Login de usuario

router.post('/login', (req, res) => {
    const emailUsuario = req.body.email;
    const passwordUsuario = req.body.password;

    ModeloUsuario.findOne({ email: emailUsuario, password: passwordUsuario })
        .then((user) => {
            if (user) {
                SesionUsuario.guardarSesion();
                return res.json(new ModeloResponse('El usuario se logueó correctamente'));
            } 
            return res.json(new ModeloResponse('Usuario y/o contraseña incorrecta', true));
        })
        .catch((error) => {
            return res.json(new ModeloResponse(error, true));
        });
});

//Funcionando

// ===================================



// Estado de la sesion

router.get('/estadoSesion', (req, res) => {
    return res.json(SesionUsuario.obtenerSesionActual())
});

//Funcionando

// ===================================



//Desloguear usuario

router.post('/logOut', (req, res) => {
     SesionUsuario.finalizarSesion();
     return res.json(new ModeloResponse('Cerraste sesion'))
});

//Funcionando

// ===================================



//Borrar usuario

router.delete('/usuarios/:email', (req, res) => {
    const emailUsuario = req.params.email;
    ModeloUsuario.deleteOne({ email: emailUsuario })
        .then(() => res.json(new ModeloResponse(`Se removio el usuario ${emailUsuario}`)))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================


//Actualizar usuario

router.put('/usuarios/:email', (req, res) => {
    const { email } = req.params;
    const { firstName,lastName, password } = req.body;
    ModeloUsuario
        .updateOne({ email: email }, { $set: { firstName,lastName, password } })
        .then((data) => res.json(new ModeloResponse('Se modifico el usuario correctamente')))
        .catch((error) => res.json(new ModeloResponse(error, true)));
});

//Funcionando

// ===================================

module.exports = router;

