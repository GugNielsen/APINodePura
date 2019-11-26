const express = require('express');

const Medico = require('../models/Medicos')

const Patologia = require('../models/Patologia')

const router = express.Router();

router.post('/Create',async(req,res)=>{
    const {codMedico,nomePatologia,IsVitalicio} = req.body;

    const medico=  await Medico.findOne({cod:codMedico});

    if(!await Medico.findOne({cod:codMedico})){
        res.status(401).send({erro:'Medico não econtrado com esse codigo'});
        }  

        if(await Patologia.findOne({nome:nomePatologia})){
            res.status(401).send({erro:'Patologia já registrada'});
            }  
         else{
            const patalogia = {
                nome:nomePatologia,
                IsVitalicio:IsVitalicio
            }
    
           // console.log(patalogia);
            p2 = await Patologia.create(patalogia);
            res.send({Patologia:patalogia});
         }   
       
})

router.get('/',async(req,res)=>{ 

    //const eps = await Patologia.findOneAndRemove({paciente:[]});
    const eps = await Patologia.find();
  
    res.send({Patologia:eps});
  })

module.exports = app => app.use('/patologia',router);