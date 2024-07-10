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
  //Verifica se tem profissionais no banco de dados
  const users = await prisma.Profissionais.findMany()
  if (users.length > 0) {
    console.log('Algum usuário já cadastrado')
  }
  else{
    await Profissionais()
  }
  //Verifica se tem pacientes no banco de dados
  const pacientes = await prisma.Pacientes.findMany()
  if (pacientes.length > 0) {
    console.log('Algum paciente já cadastrado')
  }
  else{
    await Pacientes()
  }
}

async function Permissoes(){
  //Cria as permissões necessárias
  const permissao1 = await prisma.permissao.create({
    data: {
      acesso: 'Admin',
    },
  })

  const permissao2 = await prisma.permissao.create({
    data: {
      acesso: 'Profissional',
    },
  })

  const permissao3 = await prisma.permissao.create({
    data: {
      acesso: 'Recepcionista',
    },
  })
  return {permissao1, permissao2, permissao3};
}
async function Pacientes(){
  // Criação dos Pacientes
  await prisma.Pacientes.create({
    data: {
      cpf: "138.845.747-25",
      email: 'Lucasguedes2908@gmail.com',
      nome: 'Lucas Guedes',
      telefone: '84 99428-0599',
      foto: 'gs://clinica-maria-luiza.appspot.com/uploads/34852164-cf03-4d5b-adb7-7aa1940aea62_WhatsApp Image 2024-05-09 at 07.49.14.jpeg',
    },
  });

  await prisma.Pacientes.create({
    data: {
      cpf: "738.585.784-25",
      email: 'JoãoPaulo@gmail.com',
      nome: 'João Paulo',
      telefone: '84 8133-2996',
      foto: 'gs://clinica-maria-luiza.appspot.com/uploads/zdnv504i.png',
    },
  })
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