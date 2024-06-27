const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcryptUtil = require("./utils/bcrypt.ultil")
require('dotenv').config();

async function FirstRun() {

  // Verificar se já existem permissões no banco de dados
  console.log(process.env.DATABASE_URL);
  const existingPermissions = await prisma.Permissao.findMany({})
  if (existingPermissions.length > 0) {
    console.log('Permissões já adicionadas')
  }
  else{
    await Permissoes()
  }
  const users = await prisma.Profissionais.findMany()
  if (users.length > 0) {
    console.log('Algum usuário já cadastrado')
    return
  }
  else{
    await Profissionais()
  }
}
async function Permissoes(){
  const permissao1 = await prisma.permissao.create({
    data: {
      nivel: parseInt(process.env.PERMISSAO_ADMIN),
      acesso: 'Admin',
    },
  })

  const permissao2 = await prisma.permissao.create({
    data: {
      nivel: parseInt(process.env.PERMISSAO_PROFISSIONAL),
      acesso: 'Profissional',
    },
  })

  const permissao3 = await prisma.permissao.create({
    data: {
      nivel: parseInt(process.env.PERMISSAO_RECEPCIONISTA),
      acesso: 'Recepcionista',
    },
  })
  return {permissao1, permissao2, permissao3};
}
async function Profissionais(){
  // Criação dos profissionais
  let senha_users = bcryptUtil.hash(process.env.SENHA, process.env.SALTOS);

  await prisma.Profissionais.create({
    data: {
      email: 'admin@gmail.com',
      senha: senha_users,
      nome: 'Admin',
      telefone: '84 99428-0599',
      foto: 'gs://clinica-maria-luiza.appspot.com/uploads/funcionarios2.svg',
      identificador: 'ADMIN',
      permissaoId: parseInt(process.env.PERMISSAO_ADMIN),
    },
  })

  await prisma.Profissionais.create({
    data: {
      email: 'profissional@gmail.com',
      senha: senha_users,
      nome: 'Profissional',
      telefone: '84 99428-0599',
      foto: 'gs://clinica-maria-luiza.appspot.com/uploads/funcionarios2.svg',
      identificador: 'Nutricionista',
      permissaoId: parseInt(process.env.PERMISSAO_PROFISSIONAL),
    },
  })

  await prisma.Profissionais.create({
    data: {
      email: 'recepcionista@gmail.com',
      senha: senha_users,
      nome: 'Recepcionista',
      telefone: '84 99428-0599',
      foto: 'gs://clinica-maria-luiza.appspot.com/uploads/funcionarios2.svg',
      identificador: 'Recepção',
      permissaoId: parseInt(process.env.PERMISSAO_RECEPCIONISTA),
    },
  })
}
module.exports = {
  FirstRun,
  Permissoes,
  Profissionais
}