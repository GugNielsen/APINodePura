const express = require('express');

const Medico = require('../models/Medicos')

const Especialidade = require('../models/Especialidade')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const mailer = require('../../modules/mailer')

router.post('/create', async(req,res)=>{
    const {especialidadeNone,nomeMedico,cod} = req.body
  const esp =  await Especialidade.findOne({nome:especialidadeNone})

  if(!await esp){

    try {
      const newEspecilidade ={
        nome:especialidadeNone
      }
      const especialidade = await Especialidade.create(newEspecilidade);
      const medico = {
                     nome:nomeMedico,
                     cod:cod,
                     especialidade:especialidade,
                     
                 }
  
          if(await Medico.findOne({cod:cod})){
           res.status(401).send({erro:'Medico ja cadastro com esse codigo'})
       }
          const m2 = await Medico.create(medico);
  
        const e2 = await especialidade.medicos.push(m2);
         await especialidade.save();
  
         await res.send({Sucesso:'Criado Com Sucesso'})
      
    } catch (error) {
      res.status(501).send({error:error});
      
    }
      
        
  }
else{
    const medico = {
        nome:nomeMedico,
        cod:cod,
        especialidade:esp,
        
    }

    if(await Medico.findOne({cod:cod})){
    res.status(401).send({erro:'Medico ja cadastro com esse codigo'})
    }   
    const m2 = await Medico.create(medico);

      await  esp.medicos.push(m2);
       await esp.save();

       res.send({medico:m2})
    }

})

router.get('/',async(req,res)=>{ 

  //const eps = await Medico.findOneAndRemove({cod: "4",}).populate({ path: 'medicos', select: 'nome' });
  //const eps = await Especialidade.findOne({nome:"Enfremeiro"});
 //const eps = await Especialidade.find().populate({ path: 'medicos', select: 'nome ,-_id' });
 const eps = await Especialidade.find();
//const eps = await Medico.find().populate({ path: 'especialidade', select: 'nome , -_id' });


// }

 //eps.medicos.splice(0, Number.MAX_VALUE);
  //eps.remove();



  res.send({Especialidade:eps});
})



module.exports = app => app.use('/medico',router);