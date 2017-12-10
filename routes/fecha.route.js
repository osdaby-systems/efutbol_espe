'use strict'

var express = require('express');
var FechaController = require('../controller/fecha.controller.js');

var api = express.Router();

var md_auth = require('../midddlewards/autenticated');


api.post('/guardar', md_auth.ensureAuth , FechaController.saveFecha);
api.get('/:id',FechaController.getFechaById);
api.get('/',FechaController.getFechas);
api.get('/by/categoria/:id_categoria',FechaController.getFechaByIdCategoria);
api.get('/by/categoriaAdministrador/:id_categoria',FechaController.getFechaByIdCategoriaParaGuardar);
api.put('/actualizar/:id',md_auth.ensureAuth, FechaController.updateFecha);

module.exports = api;