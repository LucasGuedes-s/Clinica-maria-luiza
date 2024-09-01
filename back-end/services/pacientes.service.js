const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil")
require('dotenv').config();

async function getPacientes() {
  const pacientes = await prisma.Pacientes.findMany({
    include: {
      paciente_dados: true // Inclui os dados da tabela Pacientes_dados
    }
  });
  //const pacientes = await prisma.Pacientes.findMany();
  return pacientes;
}
async function getConsultas(user) {

  const consultas = await prisma.Pacientes.findUnique({
    where: {
      cpf: user // Usando o identificador único do paciente
    },
    include: {
      consultas: true // Inclui todas as consultas relacionadas ao paciente
    }
  });

  /*
      const paciente = await prisma.Pacientes.findUnique({
          where: {
            cpf: user
          }
        });
        // Verifica se o paciente foi encontrado
        if (paciente) {
          // Buscar consultas associadas ao paciente encontrado
          const consultas = await prisma.Consultas.findMany({
            where: {
              pacienteId: user // Usando o identificador único do paciente
            }
          });*/

  return consultas;
}
async function getConsulta(consulta) {
  const consultas = await prisma.Consultas.findUnique({
    where: {
      id: consulta // Usando o identificador único do paciente
    }
  });
  return consultas;
}
async function cadastrarPaciente(req) {
  console.log(req.paciente)
  const pacientes = await prisma.Pacientes.create({
    data: {
      cpf: req.paciente.cpf,
      email: req.paciente.email,
      nome: req.paciente.nome,
      nome_responsavel: req.paciente.nome_mae,
      data_nascimento: new Date(req.paciente.data_nascimento),
      telefone: req.paciente.telefone,
      endereco: req.paciente.endereco,
      foto: req.paciente.foto,
    }
  });

  return pacientes;
}
async function registrarConsulta(req) {
  const paciente = await prisma.Pacientes.findUnique({
    where: { cpf: req.consulta.pacienteId }
  });
  if (!paciente) {
    throw new Error('Paciente não encontrado');
  }
  const consulta = await prisma.Consultas.create({
    data: {
      consulta: req.consulta.consulta,
      data: new Date(),
      descricao: req.consulta.descricao,
      paciente: {
        connect: { cpf: req.consulta.pacienteId }
      },
      profissional: {
        connect: { email: req.consulta.profissionalId }
      },
      laudos: req.consulta.laudos,
      foto: req.consulta.foto
    }
  });

  return consulta;
}
async function cadastrarDados(dados) {
  console.log(dados)

  const cad_dados = await prisma.Pacientes_dados.create({
    data: {
      pacienteId: dados.dados.pacienteId,
      peso: parseFloat(dados.dados.peso),
      altura: parseFloat(dados.dados.altura),
      comestiveis: dados.dados.comestiveis,
      tangiveis: dados.dados.tangiveis,
      fisicos: dados.dados.fisicos,
      data_neuro: new Date(dados.dados.data_neuro),
      alergicos: dados.dados.alergicos,
    },
  });
  return cad_dados;
}
module.exports = { getPacientes, getConsultas, getConsulta, cadastrarDados, cadastrarPaciente, registrarConsulta };