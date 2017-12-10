'use strict'

var Categoria = require('../models/categoria.model');
var mongoose = require('mongoose');

function saveCategoria(req, res) {
    var categoria = new Categoria();
    var params = req.body;
    categoria.nombre_categoria = params.nombre_categoria;
    categoria.n_equipos_categoria = params.n_equipos_categoria;
    categoria.observacion_categoria = params.observacion_categoria;
    categoria.id_temporada = params.id_temporada;
    categoria.segunda_vuelta=params.segunda_vuelta;
    categoria.save(function (err, categoraGuardada) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categoraGuardada) {
                res.status(404).send({ mensaje: "No se ha podido guardar la Categoria en la base de datos" });
            } else {
                res.status(200).send({ categoria: categoraGuardada })
            }
        }
    });
}

function getCategorias(req, res) {
    
    Categoria.find().exec(function (err, categorias) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categorias) {
                res.status(404).send({ mensaje: "No existen categorias creadas" });
            } else {
                console.log(categorias);
                res.status(200).send(categorias);
            }
        }
    });
}

function getTodasCategorias(req,res){
    var find = Categoria.find({})
    find.populate({path:'codigo_equipo'}).exec(function (err, categorias) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categorias) {
                res.status(404).send({ mensaje: "No existen categorias creadas" });
            } else {
                res.status(200).send(categorias);
            }
        }
    });
}
function getCategoriaById(req, res) {
    var categoriaId = req.params.id;
    Categoria.findById(categoriaId).exec(function (err, categorias) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categorias) {
                res.status(404).send({ mensaje: "No existen la categoria" });
            } else {
                res.status(200).send({ categoria: categorias });
            }
        }
    });
}

function updateCategoria(req, res) {
    var categoriaId = req.params.id;
    var update = req.body;

    Categoria.findByIdAndUpdate(categoriaId, update, function (err, categoriaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categoriaActualizada) {
                res.status(404).send({ mensaje: "No se ha podido actualizar la categoria" });
            } else {
                res.status(200).send({ categoria: categoriaActualizada });
            }
        }
    });
}

function updateEquipoCategoria(req, res) {

    var categoriaId = req.params.id;
    var update = req.body.codigo_equipo;

    Categoria.findById(categoriaId, (err, actualizado) => {
        console.log("ARREGLO = " + actualizado.codigo_equipo)
        if(actualizado.codigo_equipo.length==0){
            Categoria.findByIdAndUpdate(categoriaId, { $push: { codigo_equipo: update } }, function (err, actualizado) {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el Servidor" });
                } else {
                    if (!actualizado) {
                        res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                    } else {
                        res.status(200).send({ categoria: actualizado });
                    }
                }
            });            
        }else{

        for (var index = 0; index < actualizado.codigo_equipo.length; index++) {
            console.log(index);
            if (actualizado.codigo_equipo[index] == update) {
                console.log("Ya existe este id");
                res.status(200).send({mensaje : "Ya existe Un equipo guardado con este id: "+update});               
                break;
            }else{
                console.log("No hay coincidencias");
                if(index==actualizado.codigo_equipo.length-1){
                    Categoria.findByIdAndUpdate(categoriaId, { $push: { codigo_equipo: update } }, function (err, actualizado) {
                                if (err) {
                                    res.status(500).send({ mensaje: "Error en el Servidor" });
                                } else {
                                    if (!actualizado) {
                                        res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                                    } else {
                                        res.status(200).send({ categoria: actualizado });
                                    }
                                }
                            });
                }
            }
        }
    }
    });
    
}

function quitarEquipoCategoria (req,res){
    var ids_equipos;
    var categoriaId = req.params.id;
    var id_equipo = req.body.codigo_equipo;
    Categoria.findById(categoriaId,function(err,categoria){
        if(err){
            res.status(500).send({mensaje: "Error en el servidor"})
        }else{
            if(!categoria){
                res.status(404).send({mensaje: "No se ha encontrado la categoria"})
            }else{
                for (var index = 0; index < categoria.codigo_equipo.length; index++) {
                    if(categoria.codigo_equipo[index] == id_equipo){
                        categoria.codigo_equipo.splice(index,1);
                    }
                }
                ids_equipos=categoria.codigo_equipo;
                console.log(categoria.codigo_equipo);
                //res.status(200).send({data: ids_equipos});
                Categoria.findByIdAndUpdate(categoriaId,{$set:{codigo_equipo:categoria.codigo_equipo}},function(err,actualizadoCategoria){
                    if(err){
                        res.status(500).send({mensaje:"Error en el servidor"});
                    }else{
                        if(!actualizadoCategoria){
                            res.status(404).send({mensaje : "Error al guardar la Categoria en codigo_equipos"});
                        }else{
                            res.status(200).send({categoria: actualizadoCategoria });
                        }
                    }
                });
            }
        }
        
    });

}



module.exports = {
    saveCategoria,
    getCategorias,
    getCategoriaById,
    updateCategoria,
    updateEquipoCategoria,
    quitarEquipoCategoria,
    getTodasCategorias
}

