'use strict'

var express = require('express');
var TemporadaController = require('../controller/temporada.controller.js');

var api = express.Router();

var md_auth = require('../midddlewards/autenticated');

var multipart = require('connect-multiparty');
var carpeta_destino_imagen = multipart({uploadDir : './public/images/reglamento'});

api.post('/guardar',[ md_auth.ensureAuth,carpeta_destino_imagen], TemporadaController.saveTemporada);
api.get('/:id',TemporadaController.getTemporadaById);
api.get('/',TemporadaController.getTemporadas);
api.put('/actualizar/:id',[ md_auth.ensureAuth,carpeta_destino_imagen], TemporadaController.updateTemporada);
api.get('/get-pdf-temporada/:PDFFile', TemporadaController.getPDFFile);
api.put('/actualizarSoloEstado/:id',md_auth.ensureAuth,TemporadaController.updateTemporadaEstado);

module.exports = api;