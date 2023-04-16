const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Usuario = require('../models/usuario.model');

// Obtiene todos los usuarios
router.get('/usuario', (req, res) => {
    Usuario.find()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener detalles de los usuario: nombre y apellido
router.get('/usuarios', (req, res) => {
    Usuario.find({}, {nombre: true, apellido: true})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener ordenes de un usuario por id
router.get('/usuario/:id/ordenes', (req, res) => {
    const { id } = req.params;
    Usuario.findById({_id: mongoose.Types.ObjectId(id)}, {ordenes: true})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Guardar nuevo orden de un usuario
router.post('/usuario/:id/nueva-orden', (req, res) => {
    const { id } = req.params;
    const { nombreProducto, descripcion, cantidad, precio } = req.body;
    Usuario.updateOne(
        {
            _id: mongoose.Types.ObjectId(id),
        }, 
        {
            $push: {
                ordenes: {
                    nombreProducto: nombreProducto,
                    descripcion: descripcion,
                    cantidad: cantidad,
                    precio: precio
                }
            }
        })
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;