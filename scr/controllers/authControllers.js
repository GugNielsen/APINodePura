const express = require('express');

const User = require('../models/User')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function genereteToken(params = {}){
    return jwt.sign(params,authConfig.secret,{
        expiresIn:86400
    })
}

router.post('/registre',async(req,res)=>{
   const {email} = req.body.email
    try {
      if(await User.findOne({email}))
       return res.status(400).send({error:'usuario ja registrado'})
        // if (user)
        // {
        //     res.status(400).send({error:'usuario ja registrado'})
        // }
            const user = await User.create(req.body);
            user.password = undefined;
            return res.send({user,
            token:genereteToken({id:user._id})});
       
       
    } catch (error) {
        return res.status(400).send('erro' + error);
    }
  
})

router.post('/login',async (req,res)=>{
    const { email,password} = req.body;
    User.findOne({email:email}).select('+password').then((user)=>{
        if(!user){
            return res.status(400).send('Usuario não registrado');
        }
        else{
          bcrypt.compare(password,user.password,(err,batem)=>{
              if(batem){
                  //console.log(user);
                user.password = undefined;
                return res.send({user,
                token:genereteToken({id:user._id})});
              }
              else{
                return res.status(400).send('senha invalida');
              }
          })
       // console.log(valid);
        }
    })
})

module.exports = app => app.use('/auth',router);