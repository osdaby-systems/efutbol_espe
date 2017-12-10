'use strict'

var express = require('express');
var NoticiaController = require('../controller/noticia.controller');
var api = express.Router();
var md_auth = require('../midddlewards/autenticated');

var multipart = require('connect-multiparty');
var carpeta_destino_imagen = multipart({uploadDir : './public/images/noticias'});

//api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/save', [md_auth.ensureAuth,carpeta_destino_imagen], NoticiaController.saveNoticia);
api.get('/lista/:page?', NoticiaController.getNoticias);
api.put('/update/:id', [md_auth.ensureAuth,carpeta_destino_imagen],NoticiaController.updateNoticia);
api.delete('/delete/:id', md_auth.ensureAuth, NoticiaController.deleteNoticia);
// api.post('/upload-image-noticia/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/get-image-noticia/:imageFile', NoticiaController.getImageFile);

module.exports = api;