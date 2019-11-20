const express = require('express');
const Bar = require('../models/Bar')


const User = require('../models/User')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const authMiddelwares = require('../middlewares/auth')

router.post('/add',async(req,res)=>{

    const {email,password,nomeBar,local} = req.body;
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
        var bar ={
            nomeBar:nomeBar,
            local:local,
            user: user
        }
        Bar.create(bar);
        res.send(bar);
    }

})




module.exports = app => app.use('/bar',router);