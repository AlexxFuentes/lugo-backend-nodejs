const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./modules/database')
const usuariosRouter = require('./routes/usuarios.routes');
const categoriasRouter = require('./routes/categorias.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(usuariosRouter);
app.use(categoriasRouter);


app.listen(8888, () => {
    console.log('Listening on port 8888');
});