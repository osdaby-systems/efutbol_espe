'use strict'

var express = require('express');
var PersonalController = require('../controller/personal.controller');
//me permite hacver los metodos get,post
var api = express.Router();

var md_auth = require('../midddlewards/autenticated');

var multipart = require('connect-multiparty');
var carpeta_destino_imagen = multipart({uploadDir : './public/xls/personal'});


api.post('/guardar',[ md_auth.ensureAuth,carpeta_destino_imagen],PersonalController.savePersonal);
//api.get('/obtenerEquipo/:id',EquipoController.getEquipo);
//api.get('/listarCategoria/:categoria_perteneciente',EquipoController.getEquiposCategoria);
api.put('/actualizar/:id',md_auth.ensureAuth,PersonalController.updatePersonal);
//api.post('/cargarImagen/:id',[md_auth.ensureAuth,md_upload],EquipoController.uploadImage);
api.get('/imagen/:imageFile',PersonalController.getImagenFile);
api.delete('/eliminar/:id',md_auth.ensureAuth,PersonalController.deletePersonal);
api.delete('/eliminarGroup/:ar',md_auth.ensureAuth,PersonalController.eliminarGrupoPersonal);
api.post('/saveXLS/:longActPersonal',[ md_auth.ensureAuth,carpeta_destino_imagen],PersonalController.savePersonalXLS);

module.exports=api;