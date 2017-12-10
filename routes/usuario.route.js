'use strict'

var express = require('express');
var UserController = require('../controller/usuario.controller.js');

var api = express.Router();

var multipart = require('connect-multiparty');

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;