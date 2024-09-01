const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil");
require('dotenv').config();

async function getProfissionais(){   
    const profissionais = await prisma.Profissionais.findMany();

    return profissionais;
}
async function getProfissional(usuario){  
    const profissionais = await prisma.Profissionais.findMany({
        where:{
            email: usuario.usuario.email
        }
    });
    return profissionais;
}
async function postProfissional(user){  
    console.log(user)
    let senha_user = bcryptUtil.hash(process.env.SENHA, process.env.SALTOS);

    const cad = await prisma.Profissionais.create({
        data: {
            email: user.usuario.email,
            senha: senha_user,
            nome: user.usuario.nome,
            telefone: user.usuario.telefone,
            foto: user.usuario.foto,
            identificador: user.usuario.email, //"user.usuario.identificador"
            permissaoId: 2,
        },
    });
    console.log("aqui")
    console.log(cad)
    return cad;
}
/*async function cadastrarProfissional(req){  
    console.log(req)
      const profissionais = await prisma.Profissionais.create({
          data: {
              nome: req.profissional.nome,
              data_nascimento: new Date(req.profissional.data_nascimento),
              email: req.profissional.email,
              telefone: req.profissional.telefone,
              pix: req.profissional.pix,
              foto: req.profissional.foto,
          }
      });
      console.log(profissionais)
      return profissionais;
}*/

module.exports = {getProfissionais, postProfissional, getProfissional};