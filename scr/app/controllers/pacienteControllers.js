const express = require('express');

const Medico = require('../models/Medicos')

const Medicamento = require('../models/Medicamento')

const Paciente = require('../models/Paciente')

const Patologia = require('../models/Patologia')

const router = express.Router();

router.post('/Create',async(req,res)=>{
    const  {nome,sobernome} = req.body;

  const pacienteTest = await Paciente.findOne({nome:nome});
  if(await pacienteTest){
      
      if(pacienteTest.sobernome == sobernome){
          res.status(401).send({Erro:"Usuario já registrado"})
      }
  }

   const paciente = {
       nome:nome,
       sobernome:sobernome
   };
  // console.log(pacienteTest.sobernome)
  const p2 = await Paciente.create(paciente)
  res.send({Paciente:p2});
    
})

router.post('/addmeedico',async(req,res)=>{
    const {codMedico,nomePaciente,sobernomePaciente} = req.body;
    const medico = await Medico.findOne({cod:codMedico});
    const paciente = await Paciente.findOne({nome:nomePaciente,sobernome:sobernomePaciente})
    if(!await medico){
        res.status(401).send({error:"Medico não econtrado Pelo Codigo"})
    }
    if(!await paciente){
        console.log(paciente)
        res.status(401).send({error:"Paciente não registrado"})
    }

    paciente.medicos.push(medico);
    medico.paciente.push(paciente);

    paciente.save();
    medico.save();

    res.send({
       
        Paciente:paciente
    })


})

router.post('/addpatologia',async(req,res)=>{
    const {codMedico,nomePatologia,nomePaciente} = req.body;
    const medico = await Medico.findOne({cod:codMedico});

    if(!await medico)
    {
        res.status(401).send({error:"Medico não Registrado "})
    }

    const patologia = await Patologia.findOne({nome:nomePatologia});
    if(!await patologia)
    {
        res.status(401).send({error:"Patologia não Registrada "})
    }

    const paciente = await Paciente.findOne({nome:nomePaciente}).populate({ path: 'medicos', select: 'nome cod ,-_id' });;
    if(!await paciente)
    {
        res.status(401).send({error:"paciente não Registrado "})
    }
    else  {
       await patologia.pacientes.push(paciente);
      await  paciente.patologias.push(patologia);
        patologia.save();
        paciente.save();
    
        res.send({Paciente:paciente});
    }
   

})

router.post('/addmedicamento',async(req,res)=>{
    const {codMedico,nomePaciente,nomeMedicamento}= req.body;

    const medico = await Medico.findOne({cod:codMedico});

    if(!await medico){
         res.status(401).send({erro:'Medico não econtrado com esse codigo'});
        }  
     const paciente = await Paciente.findOne({nome:nomePaciente}) 
     if(!await paciente)
     {
         res.status(401).send({error:"Paciente não Registrado "})
     }

     const medicamento = await Medicamento.findOne({nome:nomeMedicamento}) 
     if(!await medicamento)
     {
         res.status(401).send({error:"Medicamento não Registrado "})
     }

     paciente.medicamentos.push(medicamento);
     medicamento.pacientes.push(paciente);

     paciente.save();
     medicamento.save();

     res.send({Paciente:paciente});

    

})

router.post('/removemedicamento',async(req,res)=>{
    const {codMedico,nomePaciente,nomeMedicamento}= req.body;

    const medico = await Medico.findOne({cod:codMedico});

    if(!await medico){
         res.status(401).send({erro:'Medico não econtrado com esse codigo'});
        }  
     const paciente = await Paciente.findOne({nome:nomePaciente}) 
     if(!await paciente)
     {
         res.status(401).send({error:"Paciente não Registrado "})
     }

     const medicamento = await Medicamento.findOne({nome:nomeMedicamento}) 
     if(!await medicamento)
     {
         res.status(401).send({error:"Medicamento não Registrado "})
     }
     //list.splice(list.indexOf('foo'), 1);
 
     paciente.medicamentos.remove(medicamento);
     medicamento.pacientes.remove(paciente);
     paciente.save();
     medicamento.save();
  
     res.send({Paciente:paciente});

})

router.post('/removepatologia',async(req,res)=>{
    const {codMedico,nomePatologia,nomePaciente} = req.body;
    const medico = await Medico.findOne({cod:codMedico});

    if(!await medico)
    {
        res.status(401).send({error:"Medico não Registrado "})
    }

    const patologia = await Patologia.findOne({nome:nomePatologia});
    if(!await patologia)
    {
        res.status(401).send({error:"Patologia não Registrada "})
    }

    const paciente = await Paciente.findOne({nome:nomePaciente}).populate({ path: 'medicos', select: 'nome cod ,-_id' });;
    if(!await paciente)
    {
        res.status(401).send({error:"paciente não Registrado "})
    }
    else  {
       await patologia.pacientes.remove(paciente);
      await  paciente.patologias.remove(patologia);
        patologia.save();
        paciente.save();
    
        res.send({Paciente:paciente});
    }
   

})

router.get('/',async(req,res)=>{ 
    
    const eps = await Paciente.find();
  
    res.send({Paciente:eps});
  })

module.exports = app => app.use('/paciente',router); 