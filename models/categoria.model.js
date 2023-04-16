const mongoose = require('mongoose');

const esquemaCategoria = new mongoose.Schema({
    nombreCategoria: String,
    descripcion: String,
    color: String,
    icono: String,
    empresas: Array
});

module.exports = mongoose.model('categorias', esquemaCategoria);