'use strict'

var path = require('path');
var fs = require('fs');
var Sancion = require('../models/sancion.model');
var Fecha = require('../models/fecha.model');

function saveSancion(req,res){
    console.log("Saving Sanción...");
    var sancion = new Sancion();
    var params=req.body;

    sancion.nombre_sancion = params.nombre_sancion;
    sancion.estado_sancion = params.estado_sancion;
    sancion.pts_sancion = params.pts_sancion;
    sancion.observacion_sancion = params.observacion_sancion;

    sancion.save((err,sancionGuardada) => {
        if(err){
            res.status(500).send({mensaje: "Error en el servidor"});
        }else{
            if (!sancionGuardada) {
                res.status(404).send({mensaje: 'Error al crear una Sanción.'});
            }else{
                res.status(200).send({sancion: sancionGuardada});
            }
        }
    });

}


function getSancionById(req,res){
    console.log("Getting by id Sancion...");
    var sancionId = req.params.id;
    Sancion.findById(sancionId).exec((err, sancionSelecionada) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!sancionSelecionada) {
                res.status(404).send({ mensaje: "La sanción no se puede encontrar" });
            } else {
                res.status(200).send({sancionSelecionada });
            }
        }
    });
    
}

function getSanciones(req,res){
    console.log("Getting  Sancion...");
    Sancion.find({},(err,sanciones)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(sanciones.length==0){
                res.status(404).send({ mensaje: "No existen sanciones creadas" });
            }else{
                
                res.status(200).send(sanciones);
            }
        }
    });
    
}

function updateSancion(req,res){
    console.log("Updating Sancion...");
    var sancionId = req.params.id;
    var update = req.body;

    Sancion.findByIdAndUpdate(sancionId, update, function (err, sancionActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!sancionActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la sanción seleccionada" });
            } else {
                res.status(200).send({ sancionActualizada })
            }
        }
    })
}

function deleteSancion(req, res) {
    var sancionId = req.params.id;
    Sancion.findByIdAndRemove(sancionId, function (err, deleteSancion) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar la sanción." });
        } else {
            if (!deleteSancion) {
                res.status(404).send({ message: "La sanción no ha  podido ser eliminado." });
            } else {
                
                // Fecha.find({'codigo_sancion_equipo1':deleteSancion._id},(err,updateFecha)=>{
                //     if(err)
                //     {
                //         res.status(500).send({ message: "Error al eliminar la sanción." });
                //     }else{
                //         if(updateFecha.length!=0)
                //         {
                //             updateFecha.forEach((f,i)=>{                                
                //                 Fecha.findByIdAndUpdate(f._id,{'codigo_sancion_equipo1':null},(err,f)=>{
                //                     if(err){
                //                         res.status(500).send({ message: "Error al eliminar la sanción." });
                //                     }else{
                //                         console.log("Se quito la sancion a "+f);
                //                     }                                    
                //                 });
                //             });                            
                //         }
                //     }                
                // });
                // Fecha.find({'codigo_sancion_equipo2':deleteSancion._id},(err,updateFecha)=>{
                //     if(err)
                //     {
                //         res.status(500).send({ message: "Error al eliminar la sanción." });
                //     }else{
                //         if(updateFecha.length!=0)
                //         {
                //             updateFecha.forEach((f,i)=>{                                
                //                 Fecha.findByIdAndUpdate(f._id,{'codigo_sancion_equipo2':null},(err,f)=>{
                //                     if(err){
                //                         res.status(500).send({ message: "Error al eliminar la sanción." });
                //                     }else{
                //                         console.log("Se quito la sancion a:"+f);
                //                     }                                    
                //                 });
                //             });                            
                //         }
                //     }                
                // });
                res.status(200).send({deleteSancion});

            }
        }
    });
}

module.exports = {
    saveSancion,
    getSancionById,
    getSanciones,
    updateSancion,
    deleteSancion
}