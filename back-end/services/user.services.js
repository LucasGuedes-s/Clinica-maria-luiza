const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const bcrypt = require('../utils/bcrypt.ultil');
const { permission } = require('process');

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
        console.log("Usuário Logado")
    }
    else{
        throw new Error('Usuário ou senha inválido')
    }
}

module.exports = {LoginUser};