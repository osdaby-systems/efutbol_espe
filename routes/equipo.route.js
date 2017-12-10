'use strict'

var express = require('express');
var EquipoController = require('../controller/equipo.controller');
//me permite hacver los metodos get,post
var api = express.Router();

var md_auth = require('../midddlewards/autenticated');

var multipart = require('connect-multiparty');
var carpeta_destino_imagen = multipart({uploadDir : './public/images/escudos'});


/*
Nota:
Solo para guardar,modificar,eliminar necesitamos la autenticacion del midddlewards.
el resto se debe mostrar en la pagina inicial.
*/

api.post('/guardar',[ md_auth.ensureAuth,carpeta_destino_imagen],EquipoController.saveEquipo);
api.get('/obtenerEquipo/:id',EquipoController.getEquipo);
api.get('/listarCategoria/:categoria_perteneciente',EquipoController.getEquiposCategoria);
api.get('/listartodos',EquipoController.getEquipos);
api.put('/actualizar/:id',[ md_auth.ensureAuth,carpeta_destino_imagen],EquipoController.updateEquipo);
//api.post('/cargarImagen/:id',[md_auth.ensureAuth,md_upload],EquipoController.uploadImage);
api.get('/imagen/:imageFile',EquipoController.getImagenFile);
api.delete('/delete/:id',md_auth.ensureAuth,EquipoController.deleteEquipo);
api.delete('/deleteAllPersonal/:id',md_auth.ensureAuth,EquipoController.deleteAllPersonalEquipo);
api.put('/agregarPERSONAL/:idEquipo',md_auth.ensureAuth,EquipoController.updatePersonalEquipo);
api.put('/quitarPERSONAL/:idEquipo',md_auth.ensureAuth,EquipoController.deletPersonalEquipo);

module.exports=api;