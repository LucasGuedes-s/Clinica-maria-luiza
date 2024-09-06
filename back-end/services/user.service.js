const jwt = require('jsonwebtoken')
const config= require('../config/app.config')
const bcrypt = require('../utils/bcrypt.ultil');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function LoginUser(usuario, res){ 
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
        nome: user.nome, 
        email: user.email, 
        permissao: user.permissaoId,
        foto: user.foto,
        telefone: user.telefone

    }
    if(senhaValida){
        const token = jwt.sign(dados_usuario, config.jwtSecret, {
            expiresIn: 86400 // 24 horas
        });

        console.log(`Usuário Logado token: ${token}`)
        return {token: token, dados_usuario}
        }
    else{
        throw new Error('Usuário ou senha inválido')
    }
}
async function updateSenha(users, res){ 
    const user = await prisma.Profissionais.findFirst({
        where:{
            email: users.usuario.email
        }
    });

    if(user == null){
        throw new Error('Senha inválida')
    }
    console.log(user)
    const senhaValida = bcrypt.compare(users.usuario.senha, user.senha);
    const nova_senha = bcrypt.hash(users.usuario.nova_senha)

    if(senhaValida){
        console.log(nova_senha)

        const user = await prisma.Profissionais.update({
            where:{
                email: users.usuario.email
            },
            data: {
                senha: nova_senha
            }
        });

        return 'Alterada com sucesso';
    }
    else{
        console.log(Error)
        throw new Error('Não foi possível alterar a senha do usuário')
    }

}
module.exports = {LoginUser, updateSenha};