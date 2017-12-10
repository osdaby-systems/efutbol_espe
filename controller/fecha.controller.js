'use strict'

var path = require('path');
var fs = require('fs');
var Fecha = require('../models/fecha.model');


function saveFecha(req,res){
    console.log("Saving Fecha...");
    
    //Params (equipos[],idCategoria,segunda_vuelta(true|false))
    var params=req.body;

    //LOGICA DE ENCUENTROS    
var equiposId=params.equipos;
var nEquipos;
var auxnEquipos;
var fechas;
var i=0;
var invertidoEquipo = [];
for (i=equiposId.length-1; i>=0; i--) {
  invertidoEquipo.push( equiposId[i] )
}
// LOGICA
nEquipos=equiposId.length;

if((nEquipos%2)==0)
{
    //Equipos Pares  
    var fechasInvertidas;    
    fechas=generarMatrizFechas(nEquipos,equiposId);  
    fechasInvertidas=generarMatrizFechas(nEquipos,invertidoEquipo);  
}else{
    //Equipos impares
    var fechasInvertidas;
    auxnEquipos=nEquipos+1;  
    equiposId.push("Descanso");  
    fechas=generarMatrizFechas(auxnEquipos,equiposId);  
    fechasInvertidas=generarMatrizFechas(auxnEquipos,invertidoEquipo);  
}

//FIN LOGICA DE ENCUENTROS
Fecha.remove({id_categoria:params.id_categoria},(err,data)=>{
    if(err){
        res.status(500).send({ mensaje: "Error en el servidor" });
    }else{
        console.log("Creamos de nuevo lo que se removio");
        if(data){
            try{    
                var i=0;
                
                    for(i in fechas){
                        // Por fechas 
                         
                        console.log(fechas[i]);        
                        fechas[i].forEach(function(f) {
                            var fecha = new Fecha();
                            fecha.n_fecha=i;
                            fecha.primera_segunda=1;
                            fecha.estado_fecha=false;
                            fecha.id_categoria=params.id_categoria; 
                            if(f.e1=="Descanso"){
                                fecha.id_equipo1=null;
                            }else{
                                fecha.id_equipo1=f.e1;
                            }
                            
                            if(f.e2=="Descanso"){
                                fecha.id_equipo2=null;
                            }else{
                                fecha.id_equipo2=f.e2;
                            }        
                            
                            // fecha.goles_equipo1=0;
                            // fecha.tarjetas_amarilla_equipo1=0;
                            // fecha.tarjetas_roja_equipo1=0;
                            fecha.observacion_equipo1="No tiene observaciones."
                            // fecha.goles_equipo2=0;
                            // fecha.tarjetas_amarilla_equipo2=0;
                            // fecha.tarjetas_roja_equipo2=0;
                            fecha.observacion_equipo2="No tiene observaciones."
                    
                            fecha.save((err,fechaGuardada) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).send({mensaje: "Error en el servidor"});
                                }else{ 
                                    if (!fechaGuardada) {
                                       throw err;
                                    }                                                                   
                                }
                            });
                        }, this);                   
                        
                    }
                
                if(params.segunda_vuelta)
                {        
                    for(i in fechasInvertidas){
                        // Por fechas 
                         
                        console.log(fechasInvertidas[i]);        
                        fechasInvertidas[i].forEach(function(f) {
                            var fecha = new Fecha();
                            fecha.n_fecha=i;
                            fecha.primera_segunda=2;
                            fecha.estado_fecha=false;
                            fecha.id_categoria=params.id_categoria; 
                            if(f.e1=="Descanso"){
                                fecha.id_equipo1=null;
                            }else{
                                fecha.id_equipo1=f.e1;
                            }
                            
                            if(f.e2=="Descanso"){
                                fecha.id_equipo2=null;
                            }else{
                                fecha.id_equipo2=f.e2;
                            }        
                            
                            // fecha.goles_equipo1=0;
                            // fecha.tarjetas_amarilla_equipo1=0;
                            // fecha.tarjetas_roja_equipo1=0;
                            fecha.observacion_equipo1="No tiene observaciones."
                            // fecha.goles_equipo2=0;
                            // fecha.tarjetas_amarilla_equipo2=0;
                            // fecha.tarjetas_roja_equipo2=0;
                            fecha.observacion_equipo2="No tiene observaciones."
                    
                            fecha.save((err,fechaGuardada) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).send({mensaje: "Error en el servidor"});
                                }else{ 
                                    if (!fechaGuardada) {
                                       throw err;
                                    }                                                                   
                                }
                            });
                        }, this);                   
                        
                    }   
                }
                 
            }catch(e){
                res.status(404).send({mensaje: 'Error al crear una fecha.'});
            }finally{
                res.status(200).send({fechas:fechas});
            }
        }else{
            try{    
                var i=0;
                
                    for(i in fechas){
                        // Por fechas 
                         
                        console.log(fechas[i]);        
                        fechas[i].forEach(function(f) {
                            var fecha = new Fecha();
                            fecha.n_fecha=i;
                            fecha.estado_fecha=false;
                            fecha.id_categoria=params.id_categoria; 
                            if(f.e1=="Descanso"){
                                fecha.id_equipo1=null;
                            }else{
                                fecha.id_equipo1=f.e1;
                            }
                            
                            if(f.e2=="Descanso"){
                                fecha.id_equipo2=null;
                            }else{
                                fecha.id_equipo2=f.e2;
                            }        
                            
                            // fecha.goles_equipo1=[];
                            // fecha.tarjetas_amarilla_equipo1=[];
                            // fecha.tarjetas_roja_equipo1=[];
                            fecha.observacion_equipo1="No tiene observaciones."
                            // fecha.goles_equipo2=[];
                            // fecha.tarjetas_amarilla_equipo2=[];
                            // fecha.tarjetas_roja_equipo2=[];
                            fecha.observacion_equipo2="No tiene observaciones."
                    
                            fecha.save((err,fechaGuardada) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).send({mensaje: "Error en el servidor"});
                                }else{ 
                                    if (!fechaGuardada) {
                                       throw err;
                                    }                                                                   
                                }
                            });
                        }, this);                   
                        
                    }
                
                if(params.segunda_vuelta)
                {        
                    for(i in fechasInvertidas){
                        // Por fechas 
                         
                        console.log(fechasInvertidas[i]);        
                        fechasInvertidas[i].forEach(function(f) {
                            var fecha = new Fecha();
                            fecha.n_fecha=i;
                            fecha.estado_fecha=false;
                            fecha.id_categoria=params.id_categoria; 
                            if(f.e1=="Descanso"){
                                fecha.id_equipo1=null;
                            }else{
                                fecha.id_equipo1=f.e1;
                            }
                            
                            if(f.e2=="Descanso"){
                                fecha.id_equipo2=null;
                            }else{
                                fecha.id_equipo2=f.e2;
                            }        
                            
                            // fecha.goles_equipo1=[];
                            // fecha.tarjetas_amarilla_equipo1=[];
                            // fecha.tarjetas_roja_equipo1=[];
                            fecha.observacion_equipo1="No tiene observaciones."
                            // fecha.goles_equipo2=[];
                            // fecha.tarjetas_amarilla_equipo2=[];
                            // fecha.tarjetas_roja_equipo2=[];
                            fecha.observacion_equipo2="No tiene observaciones."
                    
                            fecha.save((err,fechaGuardada) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).send({mensaje: "Error en el servidor"});
                                }else{ 
                                    if (!fechaGuardada) {
                                       throw err;
                                    }                                                                   
                                }
                            });
                        }, this);                   
                        
                    }   
                }
                 
            }catch(e){
                res.status(404).send({mensaje: 'Error al crear una fecha.'});
            }finally{
                res.status(200).send({fechas:fechas});
            }
        }
    }
});

    

}


function getFechaById(req,res){
    console.log("Getting by id Fecha...");
    var fechaId = req.params.id;
    Fecha.findById(fechaId).exec((err, fechaSelecionada) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!fechaSelecionada) {
                res.status(404).send({ mensaje: "La fecha no se puede encontrar" });
            } else {
                res.status(200).send({fechaSelecionada });
            }
        }
    });
    
}

function getFechas(req,res){
    console.log("Getting  Fecha...");
    Fecha.find({})
    .populate({path: 'goles_equipo1'})
    .populate({path: 'goles_equipo2'})
    .populate({
        path: 'id_equipo1',        
        populate: { path: 'personal_equipo' }
      })
    .populate({
        path: 'id_equipo2',        
        populate: { path: 'personal_equipo' }
      })
    .exec((err,fechas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(!fechas){
                res.status(404).send({ mensaje: "No existen fechas creadas" });
            }else{
                res.status(200).send(fechas);
            }
        }
    });
    
}

function updateFecha(req,res){
    console.log("Updating Fecha...");
    var fechaId = req.params.id;
    var update=req.body;
    // var update ={
    //     fecha:req.body.fecha,
    //     hora:req.body.hora,
    //     id_estadio:req.body.id_estadio,
    //     goles_equipo1:req.body.goles_equipo1,
    //     tarjetas_amarilla_equipo1:req.body.tarjetas_amarilla_equipo1,
    //     tarjetas_roja_equipo1:req.body.tarjetas_roja_equipo1,
    //     codigo_sancion_equipo1:req.body.codigo_sancion_equipo1,
    //     observacion_equipo1:req.body.observacion_equipo1,
    //     goles_equipo2:req.body.goles_equipo2,
    //     tarjetas_amarilla_equipo2:req.body.tarjetas_amarilla_equipo2,
    //     tarjetas_roja_equipo2:req.body.tarjetas_roja_equipo2,
    //     codigo_sancion_equipo2:req.body.codigo_sancion_equipo2,
    //     observacion_equipo2:req.body.observacion_equipo2
    // };

    Fecha.findByIdAndUpdate(fechaId, update, function (err, fechaActualizada) {
        if (err) {
            console.log(err);
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!fechaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la fecha seleccionada" });
            } else {
                res.status(200).send({ fechaActualizada })
            }
        }
    })
}

function getFechaByIdCategoria(req,res){
    var idCategoria=req.params.id_categoria;
    Fecha.find({id_categoria:idCategoria})
    .populate({path:'codigo_sancion_equipo1'})
    .populate({path:'codigo_sancion_equipo2'})
    .populate({path: 'goles_equipo1'})
    .populate({path: 'goles_equipo2'})
    .populate({path:'id_estadio'})
    .populate({path: 'tarjetas_amarilla_equipo1'})
    .populate({path: 'tarjetas_amarilla_equipo2'})
    .populate({
        path: 'id_equipo1',        
        populate: { path: 'personal_equipo' }
      })
    .populate({
        path: 'id_equipo2',        
        populate: { path: 'personal_equipo' }
      })
    .populate({
        path: 'tarjetas_roja_equipo1.id'
      })
    .populate({path: 'tarjetas_roja_equipo2.id'})
      .exec((err,fechasEncontradas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error del servidor" });
        }else{
            if(!fechasEncontradas || fechasEncontradas.length==0)
            {
                res.status(404).send({ mensaje: "No se encontraron fechas para esta categoría." });
            }else{
                res.status(200).send({ fechasEncontradas });
                console.log(fechasEncontradas);
            }
        }
    });
}

function getFechaByIdCategoriaParaGuardar(req,res){
    var idCategoria=req.params.id_categoria;
    Fecha.find({id_categoria:idCategoria})
    .populate({
        path: 'id_equipo1',        
        populate: { path: 'personal_equipo' }
      }).populate({
        path: 'id_equipo2',        
        populate: { path: 'personal_equipo' }
      })
      .exec((err,fechasEncontradas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error del servidor" });
        }else{
            if(!fechasEncontradas || fechasEncontradas.length==0)
            {
                res.status(404).send({ mensaje: "No se encontraron fechas para esta categoría." });
            }else{
                res.status(200).send({ fechasEncontradas })
            }
        }
    });
}

function generarMatrizFechas(n,equiposId){
    var Fechas={};    
    var partidos={};
    var numFechas=n-1;
    var numPartidos=(n/2);
    for(var i=0;i<numFechas;i++){              
        for(var j=0;j<numPartidos;j++){
            partidos['p'+j]={
                e1:'',
                e2:''
            }
        }        
        Fechas['fecha'+i]=partidos;

    }
    console.log(Fechas);    
var indice2=n;
var indice1;
var fechasFinal={};
var aux,aux3=false;
    for(var i=0;i<numFechas;i++){   
        indice2=n-i-1;
        indice1=0;
        var aux2=1
        console.log("Qpasa:"+indice2); 
        aux=indice2;
        aux3=false;
        var encuentros=[];
        for(var j=0;j<numPartidos;j++){            
            //ID E1
            console.log(indice1);
            encuentros.push({
                e1:equiposId[indice1],
                e2:''
            });            
            if(i>=1 && i!=j && j<=i)
                {
                    indice1=aux+j+1;                    
                } else{
                    if(i!=0 && aux3==false){
                        aux3=true;
                        indice1=0;
                    }                    
                    indice1++;                    
                }                        
            //ID E2                      
            
            if(indice2==0 && aux2==1){
                indice2=n-1; 
                aux2=0;                                                                               
            } 
            console.log(indice2);
            encuentros[j].e2=equiposId[indice2];
            indice2=indice2-1;           
            
        }

        fechasFinal[i]=encuentros;
    }

    console.log(fechasFinal);  
    return fechasFinal;  
}  

module.exports = {
    saveFecha,
    getFechaById,
    getFechas,
    updateFecha,
    getFechaByIdCategoria,
    getFechaByIdCategoriaParaGuardar

}