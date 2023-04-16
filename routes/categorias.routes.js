const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Categoria = require('../models/categoria.model');

// Obtiene todas las categorias
router.get('/categoria', (req, res) => {
    Categoria.find()
        .then(categorias => res.json(categorias))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener todas las categorias: nombreCategoria, icono, color
router.get('/categorias', (req, res) => {
    Categoria.find({}, {nombreCategoria: true, icono: true, color: true})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Obtener detalles de una categoria
router.get('/categoria/:id', (req, res) => {
    const { id } = req.params;
    Categoria.findById({_id: mongoose.Types.ObjectId(id)}, {nombreCategoria: true, empresas: true})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Crear nueva categoria
router.post('/categoria/nueva-categoria', (req, res) => {
    const { nombreCategoria, descripcion, color } = req.body;

    if (!nombreCategoria || !descripcion || !color) {
        res.status(400).json({ mensaje: 'El nombre de la categoría, la descripción y el color son obligatorios' });
        return;
    }

    Categoria.findOne({ nombreCategoria: nombreCategoria })
    .then((categoriaExistente)=>{
        if (categoriaExistente) {
            res.status(400).json({ mensaje: 'Ya existe una categoría con ese nombre' });
            return;
        }

        Categoria.create({
            nombreCategoria: nombreCategoria,
            descripcion: descripcion,
            icono: '../assets/images/test.png',
            color: color,
            empresas: []
        }).then((data)=>{
            res.json(data);
        }).catch((error)=>{
            res.json(error);
        });

    }).catch((error)=>{
        res.json(error);
    });
});



module.exports = router;