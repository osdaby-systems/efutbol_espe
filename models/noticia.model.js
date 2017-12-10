'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema = Schema({
		titulo: String,
		descripcion: String,
		observacion: String,
		fecha_publicado: {type: Date, default: Date.now },
		image: String,
		usuario: { type: Schema.ObjectId, ref: 'Usuario'},
		estado_noticia:{type:Boolean,default:true}
});

module.exports = mongoose.model('Noticia', NoticiaSchema);