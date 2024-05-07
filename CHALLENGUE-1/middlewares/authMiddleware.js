const jwt = require('jsonwebtoken');

const secret= require('../crypto/config.js')

const users = require('../data/users.js')

function generateToken(user){
    const token=jwt.sign({user: user.id}, secret,{expiresIn:'1h'});
    return token;
}

function verificationToken(req, res, next){
    const token=req.session.token;
    if(!token){
        res.status(401).json({mensaje:'Token no generado'});
    }
    else{
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json({mensaje:'Token invalido'});
            }
            else{
                req.user=decoded.user;
                next();
            }
        })
    }
}


module.exports={generateToken, verificationToken};