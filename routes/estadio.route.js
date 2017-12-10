'use strict'

var express = require('express');
var EstadioController = require('../controller/estadio.controller.js');

var api = express.Router();

var multipart = require('connect-multiparty');

var md_auth = require('../midddlewards/autenticated');
var carpeta_destino_imagen = multipart({uploadDir : './public/images/estadios'});

api.post('/guardar',[ md_auth.ensureAuth,carpeta_destino_imagen],EstadioController.saveEstadio);
api.get('/:id',EstadioController.getEstadioById);
api.get('/',EstadioController.getEstadios);
api.get('/imagen/:imageFile',EstadioController.getImagenFile);
module.exports = api;