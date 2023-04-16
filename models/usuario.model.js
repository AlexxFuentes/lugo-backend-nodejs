const mongoose = require('mongoose');

const esquemaUsuarios = new mongoose.Schema({
    nombre: String,
    apellido: String,
    ordenes: Array
});

module.exports = mongoose.model('usuarios', esquemaUsuarios);