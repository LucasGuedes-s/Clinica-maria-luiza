const login_usuario = require('../services/user.service')

async function LoginUsuario(req, res, next){
    try {
        console.log(req.body)
        const login = await login_usuario.LoginUser(req.body.usuario);
        res.setHeader('Authorization', `Bearer ${login.token}`);
        res.status(200).json({ 
            status: "OK"
        });
        res.end()
    } catch (err) {
        console.error(`Erro no login do usuário.`, err.message);
        err.statusCode = 401;
        next(err);
    }
}
module.exports = {LoginUsuario};