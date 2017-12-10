
'use strict'

var mongoose = require('mongoose');
var app = require('./app');

//    puerto servidor web del backen
var port = process.env.PORT || 3987;
//
//mongodb://localhost:27017/e-futbol
mongoose.connect('mongodb://darwin:darwin@ds229835.mlab.com:29835/test-efutbol',(err,res)=>{
    
    if(err){
        throw err;
    }else{
        console.log("La Base de Datos Esta Corriendo Exitosamente");
        app.listen(port,function(){
            console.log("Servidor de E-futbol espe esta corriendo en el puerto :^  localhost:"+port);
        })
    }
});

