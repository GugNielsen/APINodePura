const express = require('express');

const Medico = require('../models/Medicos')

const Medicamento = require('../models/Medicamento')

const Patologia = require('../models/Patologia')

const router = express.Router();

router.post('/Create',async(req,res)=>{
    const {codMedico,nomePatologia,nomeMedicamento} = req.body;

    const medico=  await Medico.findOne({cod:codMedico});

    if(!await medico){
        res.status(401).send({erro:'Medico não econtrado com esse codigo'});
        }  

        if(await Medicamento.findOne({nome:nomeMedicamento})){
            res.status(401).send({erro:'O Medicamento já esta Registrado No Sistema'});
            }  
         else{
            const patologia = await Patologia.findOne({nome:nomePatologia});
            if(!await patologia){
                res.status(401).send({erro:"Patologia não registrada"})
            }
            const medicamento ={
                nome:nomeMedicamento,
                patologia:patologia

            }

           // console.log(patalogia);
            m2 = await Medicamento.create(medicamento);
            res.send({Medicamentos:m2});
         }   
       
})



router.get('/',async(req,res)=>{ 

    const eps = await Medicamento.find({});
  
    res.send({Medicamento:eps});
  })

module.exports = app => app.use('/medicamento',router);