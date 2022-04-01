const jwt= require("jsonwebtoken");

let createToken = function(id){
    const max = 3 * 24 * 60 * 60;

    return jwt.sign({id: id}, 'anonymous token', {
        expiresIn: max
    });
}


module.exports  = { 
    createToken : createToken
}