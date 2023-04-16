var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'lugo';

class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(() => {
            console.log('Database connection successful');
        })
        .catch(err => {
            console.error('Database connection error', err);
        })
    }
}

module.exports = new Database();