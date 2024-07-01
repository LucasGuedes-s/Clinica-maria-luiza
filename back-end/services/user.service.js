const jwt = require('jsonwebtoken')
const config= require('../config/app.config')
const bcrypt = require('../utils/bcrypt.ultil');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


async function LoginUser(usuario){   
    
    const user = await prisma.Profissionais.findFirst({
        where:{
            email: usuario.email
        }
    });

    if(user == null){
        throw new Error('Usuário ou senha inválido')
    }
    const senhaValida = bcrypt.compare(usuario.senha, user.senha);

    let dados_usuario = {
        nome: usuario.nome, 
        email: usuario.email, 
        permissao: usuario.permissao
    }
    if(senhaValida){
        const token = jwt.sign(dados_usuario, config.jwtSecret, {
            expiresIn: 86400 // 24 horas
        });

        console.log(`Usuário Logado token: ${token}`)
        return { token: token };
    }
    else{
        throw new Error('Usuário ou senha inválido')
    }
}

module.exports = {LoginUser};