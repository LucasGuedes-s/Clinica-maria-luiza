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
  //Verifica se já tem salas cadastradas e se não tiver faz o cadastrp
  const Salas = await prisma.Salas.findMany({})
  if (Salas.length > 0) {
    console.log('Salas já adicionadas')
  }
  else{
    await CadastrarSalas()
  }

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

  const agendamentos = await prisma.Agendamentos.findMany({})
  if (agendamentos.length > 0) {
    console.log('Agendamento')
  }
  else{
    await Agendamentos()
  }
}

async function CadastrarSalas(){
  //Cria as salas necessárias
  for(let i = 1; i < 8; i++){
    const sala = await prisma.Salas.create({
      data: {
        notas: `Sala ${i}`,
      },
    })
  }
  console.log('Salas cadastradas')
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
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Fe87a3bb3-dd13-4582-a719-e7c3c0c38764_Design%20sem%20nome%20(3).png?alt=media&token=37428848-38b9-4172-b57b-81da30bf6e2ahttps://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2F005dea4f-069a-4e1b-94f5-5a800b1a60be_334572.WdsS_E6FZYwB.jpeg?alt=media&token=fada7821-9f2c-4b0a-8022-5a7840c303cb',
    },
  });

  await prisma.Pacientes.create({
    data: {
      cpf: "738.585.784-25",
      email: 'JoãoPaulo@gmail.com',
      nome: 'João Paulo',
      telefone: '84 8133-2996',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Fe87a3bb3-dd13-4582-a719-e7c3c0c38764_Design%20sem%20nome%20(3).png?alt=media&token=37428848-38b9-4172-b57b-81da30bf6e2a',
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
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'admin@gmail.com',
      permissaoId: parseInt(process.env.PERMISSAO_ADMIN),
    },
  })

  await prisma.Profissionais.create({
    data: {
      email: 'profissional@gmail.com',
      senha: senha_users,
      nome: 'Profissional',
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'CRN:1845',
      permissaoId: parseInt(process.env.PERMISSAO_PROFISSIONAL),
    },
  })
  await prisma.Profissionais.create({
    data: {
      email: 'recepcionista@gmail.com',
      senha: senha_users,
      nome: 'Recepcionista',
      telefone: '84 99428-0599',
      foto: 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Ffuncionarios2.svg?alt=media&token=cc7511c0-9e76-4cd6-9e33-891bbb3cfd1c',
      identificador: 'recepcionista@gmail.com',
      permissaoId: parseInt(process.env.PERMISSAO_RECEPCIONISTA),
    },
  })
}
async function Agendamentos(){
  // Criação dos agendamentos
  await prisma.Agendamentos.create({
    data: {
      data: new Date(),
      agendamento: 'Consulta de Lucas',
      status: 'Andamento',
      profissionalId: "profissional@gmail.com",
      pacienteId: "138.845.747-25",
      sala: 1,
    },
  })
  await prisma.Agendamentos.create({
    data: {
      data: new Date(),
      agendamento: 'Consulta de João Paulo',
      status: 'Andamento',
      profissionalId: "profissional@gmail.com",
      pacienteId: "738.585.784-25",
      sala: 2,
    },
  })
}
module.exports = {
  FirstRun,
  Permissoes,
  CadastrarSalas,
  Profissionais,
  Agendamentos
}