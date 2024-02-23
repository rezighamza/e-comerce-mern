const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


function isAuth(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user = decoded;
        next();
    });
}


function isAdmin(req,res,next){
    const id = req.user.id;
    User.findById(id)
    .then(user => {
        if(user.role !== 'admin'){
            return res.status(403).json({message:'Forbidden'});
        }
        next();
    })
    .catch(err => res.status(500).json({message:'Server error'}));
}

module.exports = {isAuth,isAdmin};