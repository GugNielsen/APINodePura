const express = require('express');

const User = require('../models/User')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const mailer = require('../../modules/mailer')

//const html = require('../../ressources/email/auth/forgot')

const crypto = require('crypto');
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
        console.log(user);
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

router.post('/forgot',async (req , res)=>{
    //const {email}= req.body;
    try {
        const {email}= req.body;
        User.findByIdAndRemove({email:email}).then((user)=>{
            
            if(!user){
                return res.status(400).send('Usuario não registrado');
            }

            res.send(user);
           
            // const token = crypto.randomBytes(3).toString('hex');
            // const now = new Date;
            // now.setHours(now.getHours()+1);

            
            // User.findOneAndUpdate({email:email},{
            //     '$set':{
            //         passwordResetToken:token,
            //         passwordRestExpires:now
            //     }
            // }).then((us)=>{
            //     console.log(us);
            // })

            // console.log(user.passwordRestToken);

            // mailer.sendMail({
            //     to: user.email,
            //     from: 'gusanielsen@gmail.com',
            //     template:'../../ressources/email/auth/forgot',
            //     context:{token},

            //  },(err) =>{
            //     if(err){
            //         return  res.status(400).send({error:'erro no retorno ao enviar o email'}) 
            //     }
            //     console.log(token)
            //     res.send({email:'com sucesso'}); 
            // })
            
        })

    } catch (error) {
        return  res.status(400).send({error:'erro Interno '})
    }
})

router.post('/reset',async(req,res)=>{
   const  {email,token,password} = req.body
   User.findOne({email:email}).select('+passwordResetToken  passwordRestExpires').then((user)=>{

    // console.log(user.name);
    if(!user){
        return res.status(400).send({error:'Usuario não registrado'});
    }
    if(token !== user.passwordRestToken){
        return res.status(401).send({error:'Token Invalida'});
    }
    const now = new Date();

    if(now !== user.passwordRestExpires){
        return res.status(401).send({error:'Token expireou'});
    }

    user.password = password;

    user.save();

   })
     
})

module.exports = app => app.use('/auth',router);