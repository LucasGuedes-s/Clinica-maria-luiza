const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil")
require('dotenv').config();

async function loginPaciente(user) {
  const paciente = await prisma.Pacientes.findMany({
    where: {
      OR: [
        { email: user },   
        { cpf: user }       
      ]
    },
    include: {
      paciente_dados: true  // Inclui os dados da tabela Pacientes_dados
    }
  });
  return paciente;
  
}
async function getPaciente(user){
  const paciente = await prisma.Pacientes.findMany({
    where: {
      OR: [
        { email: user },   
        { cpf: user }       
      ]
    },
    include: {
      paciente_dados: true // Inclui os dados da tabela Pacientes_dados
    }
  });
  return paciente;
}
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
  return consultas;
}
async function getConsultasAba(req) {
  const consultas = await prisma.ConsultaAba.findMany({
    where: {
      pacienteId: req, // Usando o identificador único do paciente
    },
    include: {
      profissional: { // Nome do campo que define a relação no seu schema
        select: {
          nome: true // Seleciona apenas o campo 'nome' do profissional
        }
      }
    }
  });
  return consultas;
}
async function getConsulta(consulta) {
  const consult = parseInt(consulta)
  const consultas = await prisma.Consultas.findUnique({
    where: {
      id: consult // Usando o identificador único do paciente
    },
    include: {
      profissional: { // Nome do campo que define a relação no seu schema
        select: {
          nome: true // Seleciona apenas o campo 'nome' do profissional
        }
      }
    }
  });
  return consultas;
}
async function cadastrarPaciente(req) {
  const pacientes = await prisma.Pacientes.create({
    data: {
      cpf: req.paciente.cpf,
      email: req.paciente.email,
      nome: req.paciente.nome,
      nome_responsavel: req.paciente.nome_mae,
      data_nascimento: new Date(req.paciente.data_nascimento),
      telefone: req.paciente.telefone,
      endereco: req.paciente.endereco,
      tipo_paciente: req.paciente.tipo_paciente,
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
  console.log(req)
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
async function registrarConsultaAba(req) {
  const paciente = await prisma.Pacientes.findUnique({
    where: { cpf: req.consulta.pacienteId }
  });

  if (!paciente) {
    throw new Error('Paciente não encontrado');
  }
  const consulta = await prisma.ConsultaAba.create({
    data: {
      paciente: {
        connect: { cpf: req.consulta.pacienteId }
      },
      profissional: {
        connect: { email: req.consulta.profissionalId }
      },
      data: new Date(),
      hora_inicio: new Date(req.consulta.inicio),
      hora_fim: new Date(req.consulta.fim),
      descricao_atividade: req.consulta.descricao,
      Aplicacao1:  req.consulta.aplicacao1,
      Aplicacao2:  req.consulta.aplicacao2,
      Aplicacao3:  req.consulta.aplicacao3,
      Aplicacao4:  req.consulta.aplicacao4,
      Aplicacao5:  req.consulta.aplicacao5,
      teste:       req.consulta.teste,
      observacoes: req.consulta.observacoes,      
      foto:        req.consulta.foto
    }
  });
  
  return consulta;
}
async function cadastrarDados(dados) {
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
async function updateDadosPaciente(req) {
  const pacienteAtualizado = await prisma.Pacientes.update({
    where: {
      cpf: req.dados.cpf,  //  CPF é identificador único
    },
    data: {
      cpf: req.dados.cpf,  //  CPF é identificador único
      email: req.dados.email,
      telefone: req.dados.telefone,
      endereco: req.dados.endereco,
      foto: req.dados.foto,
    }
  })
  const dadosAtualizados = await prisma.Pacientes_dados.updateMany({
    where: {
      pacienteId: req.dados.cpf,
    },
    data: {
      peso: parseFloat(req.dados.peso),
      altura: parseFloat(req.dados.altura),
      comestiveis: req.dados.comestiveis,
      tangiveis: req.dados.tangiveis,
      fisicos: req.dados.fisicos,
      data_neuro: new Date(req.dados.data_neuro),
      alergicos: req.dados.alergicos,
    },
  });
  return ({
    paciente: pacienteAtualizado,
    dadosPaciente: dadosAtualizados
  });
}
module.exports = {loginPaciente, getPacientes, getPaciente, getConsultas, getConsulta, getConsultasAba, cadastrarDados, cadastrarPaciente, registrarConsulta, registrarConsultaAba, updateDadosPaciente};