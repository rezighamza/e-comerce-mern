const bycritpt = require('bcrypt');

function comparePassword(password,hash){
    return bycritpt.compare(password,hash);
}

function hashPassword(password){
    return bycritpt.hash(password,10);
}

module.exports = {comparePassword,hashPassword};