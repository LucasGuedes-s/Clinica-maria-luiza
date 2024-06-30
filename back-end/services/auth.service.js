const config = require('../config/app.config.js');
const jwt = require('jsonwebtoken');

function validarJWT(req, res, next){
    //console.log(req.headers.authorization)
    //Verifica se o token veio certo, ou está nulo
    if (!req.headers.authorization) {
        res.status(422).send({
            message: "Token nulo"
        });
    }
    const jwt_token = req.headers.authorization.split(' ')[1];
    //Verifica se o token está expirado ou válido
    jwt.verify(jwt_token, config.jwtSecret, (err, userInfo) => {
        if (err) {
            console.log(err);
            if (err.name === "TokenExpiredError") {
                res.status(401).send({
                    message: "Token Expirado."
                });
            } else {
                res.status(403).end({
                    message: "Token inválido"
                });
            }
            return;
        }
        console.log("Usuário válidado")
        req.user = userInfo;
        next();
    });
}

module.exports = validarJWT;