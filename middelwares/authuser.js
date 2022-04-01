const jwt = require("jsonwebtoken");
const c = require("cookie-parser");

const reqauth = function (request, response, next) {
    const token = request.cookies;
    //token[request.session.idcookie]
    console.log(token.jwt === undefined);

    if(token.jwt === undefined){
        console.log("hic : " + 1);
        request.session.user = null;
        response.render("pagestand/index");
    }
    else{
        jwt.verify(token.jwt, 'anonymous token', (err, decodedToken) => {
            if(err){
                console.log(err);
                request.session.user = null;
                response.redirect("/");
            }
            else{
                request.session.user = decodedToken;
                next();
            }
        }); 
    }
}

module.exports = {reqauth};