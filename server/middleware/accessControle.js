const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


function isAuth(req, res, next) {
    /*
    * Check if the request has an authorization header
    * If so, extract the token from the header
    * If the token is not present, return a 401 status code
    * If the token is present, verify the token and call the next middleware
    */
    /*
    req = {
        headers:{
            authorization : 'Bearer [token]'
        }
        body:{ }
        cookies:{ ......... 
            token: '[token]' }
        }
    */
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
        //split[0] = Bearer, split[1] = [token]
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}


function isAdmin(req, res, next) {
    const id = req.user.id;
    User.findById(id)
        .then(user => {
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        })
        .catch(err => res.status(500).json({ message: 'Server error' }));
}

module.exports = { isAuth, isAdmin };