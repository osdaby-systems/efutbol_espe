
//ARCHIVO NO VALIDO PARA CONEXION

var mongoose = require('mongoose');
mongoose.connect('mongodb://efutbol_db:123Root@ds111204.mlab.com:11204/efutbol_db');
db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Se ha establecido conexión.");
});