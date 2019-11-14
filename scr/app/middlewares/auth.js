const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

module.exports = (req,res,next) =>{

    const authHeard = req.headers.authorization;

    console.log(authHeard);

    if(!authHeard)
    return res.status(401).send({error: 'No token privided'})

    const parts = authHeard.split(' ');

    if(!parts.length ===2)
    return res.status(401).send({error: 'Token erro'})

    const [ scheme, token] = parts;

    // if (!/^Bearer$/i.test(scheme))
    // return res.status(401).send({error: 'Token malformatted'})

    jwt.verify(token, authConfig.secret,(err, decoded)  =>{
        
        if (err) {
          return res.status(500).send({ error: false, message: 'Failed to authenticate token.' })
        }
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
      });
}