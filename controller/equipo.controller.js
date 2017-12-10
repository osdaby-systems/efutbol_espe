'use strict'

var Equipo = require('../models/equipo.model');

var path = require('path');
var fs = require('fs');

function saveEquipo(req, res) {
    var equipo = new Equipo();

    var params = req.body;
    console.log("Parametros ------------->>>>>>");
    console.log(params);
    console.log("Parametros ------------->>>>>>");
    
    equipo.nombre_equipo = params.nombre_equipo;
    equipo.descripcion_equipo = params.descripcion_equipo;
    equipo.anio_fundacion_equipo = params.anio_fundacion_equipo;
    //equipo.escudo_equipo = ;
    equipo.color_principal_equipo = params.color_principal_equipo;
    equipo.color_secundario_equipo = params.color_secundario_equipo;
    equipo.observacion_equipo = params.observacion_equipo;
    equipo.estado_equipo = params.estado_equipo;
    // equipo.id_categoria = params.id_categoria;

            // equipo.personal_equipo=JSON.parse(params.personal_equipo);        
            // equipo.logros_equipo=JSON.parse(params.logros_equipo);
      console.log(equipo);  
    if (req.files && req.files.escudo_equipo!=undefined) {

        var file_path = req.files.escudo_equipo.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];
        //console.log(file_split);
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        //console.log(ext_split);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            equipo.escudo_equipo = file_name;
            //console.log(equipo)
            equipo.save((err, equipoGuardado) => {
                if (err) {
                    console.log("Error::: ===> "+err);
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else {
                    if (!equipoGuardado) {
                        res.status(404).send({ mensaje: "Error al guardar el Equipo" });
                    } else {
                        res.status(200).send({equipoGuardado});
                    }
                }
            });

        } else {
            res.status(200).send({
                mensaje: "Extension del archivo no valido"
            });
        }
    } else {
        console.log(equipo);
        console.log("GUARDADO SIN IMAGEN")        
        equipo.save((err, equipoGuardado) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                if (!equipoGuardado) {
                    res.status(404).send({ mensaje: "Error al guardar el Equipo" });
                } else {
                    res.status(200).send({equipoGuardado});
                }
            }
        });
        // res.status(200).send({
        //     message: "No ha subido Ninguna Imagen"
        // });
    }
}
function updateEquipo(req, res) {
    var equipoId = req.params.id;
    var update = req.body; 
    console.log(update);
    // if(update.personal_equipo==''){
    //     update.personal_equipo=[];
    // }else{
    //     update.personal_equipo=update.personal_equipo.split(',');        
    // } 
    update.personal_equipo=JSON.parse(update.personal_equipo);        
    update.logros_equipo=JSON.parse(update.logros_equipo);
    console.log(update);   
    if (req.files && req.files.escudo_equipo!=undefined) {     
                console.log("Con imagen")           
				var file_path = req.files.escudo_equipo.path;
				// var file_split = file_path.split('\\'); desarrollo
                var file_split = file_path.split('/');
                var file_name = file_split[3];
				//console.log(file_split);
				var ext_split = file_name.split('\.');
				var file_ext = ext_split[1];
				//console.log(ext_split);
				if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {										
					//console.log(equipo)					
                    update.escudo_equipo=file_name;                    
                        
					Equipo.findByIdAndUpdate(equipoId, update, function (err, equipoActualizado) {
						if(err){
                            console.log(err);
                            res.status(500).send({mensaje: 'Error en el servidor'});                            
						}else{
							if(!equipoActualizado){                            
								res.status(404).send({mensaje: 'No se ha actualizado la noticia'});
							}else{
								console.log(equipoActualizado);
								//BORRA ARCHIVO ANTERIOR
								if(equipoActualizado.escudo_equipo!='default.png'){
									var path_file = './public/images/escudos/'+equipoActualizado.escudo_equipo;									
									fs.exists(path_file, function(exists){
										if(exists){
											console.log(exists);
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
								res.status(200).send({mensaje: equipoActualizado});
							}
						}
					});	
				} else {
					res.status(200).send({
						mensaje: "Extension del archivo no valido"
					});
				}
			} else {

                console.log("Sin Imagen");				
                Equipo.findByIdAndUpdate(equipoId, update, function (err, equipoActualizado) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ mensaje: "Error del servidor" });
                    } else {
                        if (!equipoActualizado) {
                            res.status(404).send({ mensaje: "Error no se puede actualizar el equipo" });
                        } else {
                            res.status(200).send({ equipoActualizado })
                        }
                    }
                })
            }
}

function getImagenFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './public/images/escudos/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ mensaje: "No existe la Imagen de Escudo" })
        }
    });
}

function uploadImage(req, res) {
    var equipoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        // var file_split = file_path.split('\\');   para desarrollo
        var file_name = file_split[3];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Equipo.findByIdAndUpdate(equipoId, { escudo_equipo: file_name }, (err, escudoActualizado) => {
                if (!escudoActualizado) {
                    res.status(404).send({ mensaje: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ mensaje: escudoActualizado });
                }
            });

        } else {
            res.status(200).send({ mensaje: 'Extensión del archivo no valida' });
        }

    } else {
        res.status(200).send({ mensaje: 'No has subido ninguna imagen...' });
    }
}

function getEquipo(req, res) {
    var equipoId = req.params.id;
    Equipo.findById(equipoId).exec((err, equipoEncontrado) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!equipoEncontrado) {
                res.status(404).send({ mensaje: "El equipo no se puede encontrar" });
            } else {
                res.status(200).send({ equipoEncontrado });
            }
        }
    });
}

function getEquiposCategoria(req, res) {
    var categoriaId = req.params.categoria_perteneciente
    Equipo.find({ id_categoria: categoriaId }).sort('nombre_equipo').exec((err, equiposEncontrados) => {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!equiposEncontrados) {
                res.status(404).send({ mensaje: "No existen equipos en esta Categoria" })
            } else {
                res.status(200).send({ equiposEncontrados });
            }
        }
    })

}
function getEquipos(req, res) {

    Equipo.find({}).sort('nombre_equipo').populate({path:'personal_equipo'}).exec((err, equiposEncontrados) => {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!equiposEncontrados) {
                res.status(404).send({ mensaje: "No existen equipos creados" })
            } else {
                res.status(200).send({ equiposEncontrados });
            }
        }
    })

}

function updatePersonalEquipo(req, res) {
        var equipoId = req.params.idEquipo;
        var update = req.body.personal_equipo;
        Equipo.findById(equipoId, (err, actualizado) => {
            console.log("ARREGLO = " + actualizado.personal_equipo)
            if(actualizado.personal_equipo.length==0){
                Equipo.findByIdAndUpdate(equipoId, { $push: { personal_equipo: update } }, function (err, actualizado) {
                    if (err) {
                        res.status(500).send({ mensaje: "Error en el Servidor" });
                    } else {
                        if (!actualizado) {
                            res.status(404).send({ mensaje: "No se ha podido Guardar el Jugador en el Equipo Actual" });
                        } else {
                            res.status(200).send({ equipo: actualizado });
                        }
                    }
                });            
            }else{
    
            for (var index = 0; index < actualizado.personal_equipo.length; index++) {
                console.log(index);
                if (actualizado.personal_equipo[index] == update) {
                    console.log("Ya existe este id");
                    res.status(200).send({mensaje : "Ya existe Un Jugador con este id guardado con este id: "+update});               
                    break;
                }else{
                    console.log("No hay coincidencias");
                    if(index==actualizado.personal_equipo.length-1){
                        Equipo.findByIdAndUpdate(equipoId, { $push: { personal_equipo: update } }, function (err, actualizado) {
                                    if (err) {
                                        res.status(500).send({ mensaje: "Error en el Servidor" });
                                    } else {
                                        if (!actualizado) {
                                            res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                                        } else {
                                            res.status(200).send({ equipo: actualizado });
                                        }
                                    }
                                });
                    }
                }
            }
        }
        });
        
    }

    function deletPersonalEquipo(req, res) {
        console.log("Hola");
        var equipoId = req.params.idEquipo;
        var idPersonalDelet = req.body.personal_equipo;
        Equipo.findById(equipoId, (err, actualizado) => {
            console.log("ARREGLO = " + actualizado.nombre_equipo);
            console.log("ARREGLO = " + actualizado.personal_equipo);
            for (var index = 0; index < actualizado.personal_equipo.length; index++) {
                console.log(index);
                if (actualizado.personal_equipo[index] == idPersonalDelet) {
                    console.log("Array Base: "+ actualizado.personal_equipo[index]);
                    console.log("id Personal: "+ idPersonalDelet);
                    actualizado.personal_equipo.splice(index,1);
                    console.log("ARREGLO NUEVO");
                    var update = actualizado.personal_equipo;
                    Equipo.findByIdAndUpdate(equipoId, {personal_equipo:update}, function (err, actualizadoPeronal) {
                        if (err) {
                            res.status(500).send({ mensaje: "Error en el Servidor" });
                        } else {
                            if (!actualizado) {
                                res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                            } else {
                                res.status(200).send({ equipo: actualizadoPeronal });
                            }
                        }
                    });
                    break;
                }
            }
            
        });
        
    }

    function deleteEquipo(req, res){
        var equipoId = req.params.id; 
    
        Equipo.findByIdAndRemove(equipoId,(err,equipoEliminada)=>{
            if(err){
                res.status(500).send({mensaje: 'Error en el servidor'});
            }else{
                if(!equipoEliminada){
                    res.status(404).send({mensaje: 'El equipo no ha sido eliminado'});
                }else{
                    //BORRA ARCHIVO ANTERIOR
                    if(equipoEliminada.escudo_equipo!='default.png'){
                        var path_file = './public/images/escudos/'+equipoEliminada.escudo_equipo;									
                        fs.exists(path_file, function(exists){
                            if(exists){
                                console.log(exists);
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
                    res.status(200).send({mensaje: equipoEliminada});
                }
            }
    
        });
    }

    function deleteAllPersonalEquipo(req,res){
        var equipoId = req.params.id; 
        Equipo.findByIdAndUpdate(equipoId,{personal_equipo:[]},(err,eliminadoPersonal)=>{
            if(err){
                res.status(500).send({ mensaje: "Error en el Servidor" });
            }else{
                console.log(eliminadoPersonal);                                
                res.status(200).send({mensaje: eliminadoPersonal});
            }
        });
    }
module.exports = {
    saveEquipo,
    updateEquipo,
    getImagenFile,
    uploadImage,
    getEquipo,
    getEquiposCategoria,
    getEquipos,
    updatePersonalEquipo,
    deleteEquipo,
    deletPersonalEquipo,
    deleteAllPersonalEquipo
}