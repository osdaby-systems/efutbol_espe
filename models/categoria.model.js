'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategoriaSchema = Schema({
    nombre_categoria:String,
    n_equipos_categoria:Number,
    observacion_categoria:String,
    id_temporada: { type: Schema.ObjectId, ref: 'Temporada'},
    segunda_vuelta: Boolean,
    codigo_equipo:[
        {type : Schema.ObjectId , ref: 'Equipo', unique: true} 
    ]

});

module.exports = mongoose.model('Categoria',CategoriaSchema);