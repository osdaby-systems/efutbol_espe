'use strict'
var path = require('path');
var fs = require('fs');
var Temporada = require('../models/temporada.model');

//medtodo para subir imagenes
function saveTemporada(req,res){

    var temporada = new Temporada();
    var params=req.body;
    console.log("Aquiiii..................>>>");
    console.log(params);
    temporada.nombre_temporada = params.nombre_temporada;
    temporada.fecha_inicio = params.fecha_inicio;
    temporada.fecha_fin = params.fecha_fin;
    temporada.id_usuario = params.id_usuario;
   
    if (req.files && req.files.url_reglamento_temporada != undefined) {
                console.log("Con Imagen");
                var file_path = req.files.url_reglamento_temporada.path;
                var file_split = file_path.split('/');
                var file_name = file_split[3];
                //console.log(file_split);
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
                //console.log(ext_split);
                if (file_ext == 'pdf') {
        
                    temporada.url_reglamento_temporada = file_name;
                    //console.log(equipo)
                    temporada.save((err,temporadaGuardada) => {
                        if(err){
                            res.status(500).send({mensaje: "Error en el servidor"});
                        }else{
                            if (!temporadaGuardada) {
                                res.status(404).send({mensaje: 'Error al crear una Temporada'});
                            }else{
                                res.status(200).send({temporada: temporadaGuardada});
                            }
                        }
                    });
        
                } else {
                    console.log("Archivo no valido");
                    res.status(200).send({
                        mensaje: "Extension del archivo no valido"
                    });
                }
            } else {
                console.log("Sin Imagen");
                 //temporada.url_reglamento_temporada = "null";
                 temporada.save((err,temporadaGuardada) => {
                    if(err){
                        res.status(500).send({mensaje: "Error en el servidor"});
                    }else{
                        if (!temporadaGuardada) {
                            res.status(404).send({mensaje: 'Error al crear una Temporada'});
                        }else{
                            res.status(200).send({temporada: temporadaGuardada});
                        }
                    }
                });
                // res.status(200).send({
                //     message: "No ha subido Ninguna Imagen"
                // });
            }



    
}



function updateTemporada(req, res) {
    var temporadaId = req.params.id;
    var update = req.body;
    if (req.files && req.files.url_reglamento_temporada!=undefined) {
				var file_path = req.files.url_reglamento_temporada.path;
				var file_split = file_path.split('/');
				var file_name = file_split[3];
				//console.log(file_split);
				var ext_split = file_name.split('\.');
				var file_ext = ext_split[1];
				//console.log(ext_split);
				if (file_ext == 'pdf') {										
					//console.log(equipo)					
					update.url_reglamento_temporada=file_name;
					Temporada.findByIdAndUpdate(temporadaId, update, (err, temporadaActualizada) => {
						if(err){
							res.status(500).send({mensaje: 'Error en el servidor'});
						}else{
							if(!temporadaActualizada){
								res.status(404).send({mensaje: 'No se ha actualizado la noticia'});
							}else{
								//console.log(noticiaUpdated);
								//BORRA ARCHIVO ANTERIOR
								if(temporadaActualizada.url_reglamento_temporada != 'REGLAMENTO.pdf'){
									var path_file = './public/images/reglamento/'+temporadaActualizada.url_reglamento_temporada;									
									fs.exists(path_file, function(exists){
										if(exists){
											//console.log(exists);
											fs.unlink(path_file,(err)=>{
												if(err){
													console.log("El archivo no pudo ser eliminado");
												}else{
													console.log("Archivo eliminado...");
												}											
											});
										}else{
											console.log("No hay imagen.");
										}
									});
								}								
								res.status(200).send({mensaje: temporadaActualizada});
							}
						}
					});	
				} else {
					res.status(200).send({
						mensaje: "Extension del archivo no valido"
					});
				}
			} else {
				
                Temporada.findByIdAndUpdate(temporadaId, update, function (err, temporadaActualizada) {
                    if (err) {
                        res.status(500).send({ mensaje: "Error del servidor" });
                    } else {
                        if (!temporadaActualizada) {
                            res.status(404).send({ mensaje: "Error no se puede actualizar la temporada seleccionada" });
                        } else {
                            res.status(200).send({ temporadaActualizada })
                        }
                    }
                });
			}
}

function updateTemporadaEstado(req,res){
    var temporadaId = req.params.id;
    var update = req.body.estado_temporada;
    console.log(update);
    Temporada.findByIdAndUpdate(temporadaId, {estado_temporada:update}, function (err, temporadaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!temporadaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la temporada seleccionada" });
            } else {
                res.status(200).send({ temporada : temporadaActualizada })
            }
        }
    })
}

function getTemporadas(req,res){
    Temporada.find({},(err,temporadas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(!temporadas){
                res.status(404).send({ mensaje: "No existen temporadas creadas" });
            }else{
                res.status(200).send(temporadas);
            }
        }
    });
}

function getTemporadaById(req,res){
    var temporadaId = req.params.id;
    Temporada.findById(temporadaId).exec((err, temporadaSelecionada) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!temporadaSelecionada) {
                res.status(404).send({ mensaje: "La temoprada no se puede encontrar" });
            } else {
                res.status(200).send({temporadaSelecionada });
            }
        }
    });
}

function getPDFFile(req, res){
	var PDFFile = req.params.PDFFile;
	var path_file = './public/images/reglamento/'+PDFFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe PDF Guardado...'});
		}
	});
}


module.exports = {
    saveTemporada,
    getTemporadas,
    getTemporadaById,
    updateTemporada,
    getPDFFile,
    updateTemporadaEstado
}