'use strict'

var express = require('express');
var SancionController = require('../controller/sancion.controller.js');

var api = express.Router();

var md_auth = require('../midddlewards/autenticated');


api.post('/guardar', md_auth.ensureAuth , SancionController.saveSancion);
api.get('/:id',SancionController.getSancionById);
api.get('/',SancionController.getSanciones);
api.delete('/delete/:id',md_auth.ensureAuth,SancionController.deleteSancion);
api.put('/actualizar/:id',md_auth.ensureAuth, SancionController.updateSancion);

module.exports = api;