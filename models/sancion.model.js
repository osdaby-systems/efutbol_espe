'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SancionSchema = Schema({
    nombre_sancion: String,   
    estado_sancion:Boolean,
    pts_sancion:Number,
    observacion_sancion:String
});

module.exports = mongoose.model('Sancion',SancionSchema);
