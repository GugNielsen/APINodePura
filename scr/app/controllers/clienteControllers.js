const express = require('express');
const Clitente= require('../models/cliente')

const Bar= require('../models/Bar')


const User = require('../models/User')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const authMiddelwares = require('../middlewares/auth')

router.post('/add',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email}).select('+password')
    if(!user){
        res.status(501).send({erro:"User não registrado"})
    }
    else{

       bcrypt.compare(req.body.password,user.password,(err,batem)=>{
           if(batem){
               //console.log(user);
             user.password = undefined;
           
           }
           else{
               
            return res.status(400).send({erro:'senha invalida'});
           }
       })
       var cliente ={
           user: user,
           nome:user.nome,
           quantidade:0,
           desconto:0
           
       }
       Clitente.create(cliente);
       res.send(cliente);
    }
    
})

router.post('/desconto',async(req,res)=>{
const {nomeBar, nome} = req.body

bares = await Bar.findOne({nomeBar:nomeBar}).populate('user')


cliente = await Clitente.findOne({nome:nome}).populate('user');
var quantidade = cliente.quantidade;
var desconto = Clitente.desconto;
if( quantidade == 0){
    quantidade = quantidade + 1;
    desconto = 2;

}
else if(quantidade == 1){
    quantidade = quantidade + 1;
    desconto = 5;
}

else if(quantidade == 2){
    quantidade = quantidade + 1;
    desconto = 10;
}

else if(quantidade == 3){
    quantidade = quantidade + 1;
    desconto = 20;
}

else if(quantidade == 4){
    quantidade = quantidade + 1;
    desconto = 30;
}

else if(quantidade == 5){
    quantidade = 0;
    desconto = 50;
}

cliente.desconto = desconto;
cliente.quantidade = quantidade;
  if(await cliente.bares.includes(bares)){
    cliente.bares.push(bares);
    cliente.save();
  }
  else{
    cliente.save();
  }
 res.send(cliente);

})

module.exports = app => app.use('/cliente',router);