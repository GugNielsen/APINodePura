const express = require('express');
const Evento = require('../models/Evento')


const User = require('../models/User')

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

const authMiddelwares = require('../middlewares/auth')

router.use(authMiddelwares);

router.post('/', async(req,res)=>{
    const {titulo} = req.body;
    
    //console.log(req.userId);

    const user = await User.findOne({_id:req.userId})

    //console.log(user);

    var evento = {
        titulo:titulo,
        user:user

    }
    Evento.create(evento).then(res.send(evento));

})

router.get('/alEventos', async (req,res)=>{
    const eventos = Evento.find();

})

module.exports = app => app.use('/evento',router);