'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemporadaSchema = Schema({
    nombre_temporada:String,
    fecha_inicio:Date,
    fecha_fin:Date,
    url_reglamento_temporada:String,
    id_usuario: { type: Schema.ObjectId, ref: 'Usuario'},
    estado_temporada:{type:Boolean,default:false}
});

module.exports = mongoose.model('Temporada',TemporadaSchema);