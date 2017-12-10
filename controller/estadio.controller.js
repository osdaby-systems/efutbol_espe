'use strict'

//Subir y Ver imagenes en la carpeta del disco
var path = require('path');
var fs = require('fs');
var Estadio = require('../models/estadio.model');

//medtodo para subir imagenes
function saveEstadio(req,res){
    var estadio=new Estadio();
    var params=req.body;
    estadio.nombre_estadio=params.nombre_estadio;
    estadio.ruta_estadio=params.ruta_estadio;
    estadio.direccion_estadio=params.direccion_estadio;
    estadio.observacion_estadio=params.observacion_estadio;
    if (req.files && req.files.imagen_estadio != undefined) {
        
        var file_path = req.files.imagen_estadio.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];
        //console.log(file_split);
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        //console.log(ext_split);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            estadio.imagen_estadio = file_name;
            //console.log(equipo)
            estadio.save((err, estadioGuardado) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else {
                    if (!estadioGuardado) {
                        res.status(404).send({ mensaje: "Error al guardar el Estadio" });
                    } else {
                        res.status(200).send({ estadio : estadioGuardado });
                    }
                }
            });

        } else {
            res.status(200).send({
                mensaje: "Extension del archivo no valido"
            });
        }
    } else {
        estadio.save((err, estadioGuardado) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                if (!estadioGuardado) {
                    res.status(404).send({ mensaje: "Error al guardar el Estadio" });
                } else {
                    res.status(200).send({ estadio : estadioGuardado });
                }
            }
        });

    }
}



function getImagenFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './public/images/estadios/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ mensaje: "No existe la Imagen de Estadio" })
        }
    });
}


function uploadImage(req, res){
	var estadioId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.imagen_estadio.path;
        var file_split = file_path.split('/');     
        // var file_split = file_path.split('\\'); para desarrollo
		var file_name = file_split[3];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Estadio.findByIdAndUpdate(estadioId, {imagen_estadio: file_name}, (err, imagenEstadioActualizado) => {
				if(!imagenEstadioActualizado){
					res.status(404).send({mensaje: 'No se ha podido actualizar la imagen'});
				}else{
					res.status(200).send({mensaje: imagenEstadioActualizado});
				}
			});

		}else{
			res.status(200).send({mensaje: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({mensaje: 'No has subido ninguna imagen...'});
	}
}


function updateEstadio(req, res) {
    var estadioId = req.params.id;
    var update = req.body;

    Estadio.findByIdAndUpdate(estadioId, update, function (err, estadioActualizado) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!estadioActualizado) {
                res.status(404).send({ mensaje: "Error no se puede actualizar el estadio" });
            } else {
                res.status(200).send({ estadioActualizado })
            }
        }
    })

}


function getEstadios(req,res){
    Estadio.find({},(err,estadios)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(estadios.length==0){
                res.status(404).send({ mensaje: "El estadio no se puede encontrar" });
            }else{
                res.status(200).send(estadios);
            }
        }
    });
}

function getEstadioById(){
    var estadioId = req.params.id;
    Estadio.findById(estadioId).exec((err, estadioEncontrado) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!estadioEncontrado) {
                res.status(404).send({ mensaje: "El estadio no se puede encontrar" });
            } else {
                res.status(200).send({ estadioEncontrado });
            }
        }
    });
}


function deleteEstadio(req, res) {
    var estadioId = req.params.id;
    Estadio.findByIdAndRemove(estadioId, function (err, deleteEstadio) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el estadio." });
        } else {
            if (!deleteEstadio) {
                res.status(404).send({ message: "El estadio no ha  podido ser eliminado." });
            } else {
                res.status(200).send({deleteEstadio});
            }
        }
    });
}

module.exports = {
    saveEstadio,
    getEstadios,
    getEstadioById,
    updateEstadio,
    deleteEstadio,
    uploadImage,
    getImagenFile
}
