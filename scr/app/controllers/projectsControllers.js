const express = require('express');
const User  = require('../models/User')

const router = express.Router();

const authMiddelwares = require('../middlewares/auth')

router.use(authMiddelwares);

router.get('/',(req,res)=>{
    res.send({ok:true});
})



module.exports = app =>app.use('/projects',router);