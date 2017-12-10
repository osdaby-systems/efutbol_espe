'use strict'

var express = require('express');
var CategoriaController = require('../controller/categoria.controller');

var api = express.Router();
var md_auth = require('../midddlewards/autenticated');

api.post('/guardar',md_auth.ensureAuth,CategoriaController.saveCategoria);
api.get('/',CategoriaController.getCategorias);
api.get('/categorias',CategoriaController.getTodasCategorias);
api.get('/:id',CategoriaController.getCategoriaById);
api.put('/actualizar/:id',md_auth.ensureAuth,CategoriaController.updateCategoria);
api.put('/agregarEquipo/:id',md_auth.ensureAuth,CategoriaController.updateEquipoCategoria);
// api.get('/categorias/:id_temporada',CategoriaController.getCategoriasbyTemporada);

api.put('/quitarEquipo/:id',CategoriaController.quitarEquipoCategoria);

module.exports = api;

