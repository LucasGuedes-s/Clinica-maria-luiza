const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getConsultas() {
    const consultas = await prisma.consultas.findMany();
    const consultasPorProfissional = consultas.reduce((acc, consulta) => {
      if (!acc[consulta.profissionalId]) {
        acc[consulta.profissionalId] = [];
      }
      acc[consulta.profissionalId].push(consulta);
      return acc;
    }, {});

    return consultasPorProfissional;
}

async function getTotalConsultas() {
  const totalConsultas = await prisma.consultas.count();
  const totalConsultasAba = await prisma.consultaAba.count();

  return totalConsultas + totalConsultasAba;
}

async function getConsultasProfissional(email) {
  const getConsultasProfissionalTradicionais = await prisma.consultas.count({
      where: { profissionalId: email }
  });

  const getConsultasProfissionalAba = await prisma.ConsultaAba.count({
      where: { profissionalId: email }
  });

  const totalConsultaspacientes = getConsultasProfissionalTradicionais + getConsultasProfissionalAba;

  return totalConsultaspacientes;
}

async function getConsultasPorPaciente(cpf) {
  const consultasPorPacienteTradicionais = await prisma.consultas.count({
    where: { pacienteId: cpf }
  });

  const consultasPorPacienteAba = await prisma.consultaAba.count({
    where: { pacienteId: cpf }
  });

  const totalConsultaspacientes = consultasPorPacienteTradicionais + consultasPorPacienteAba;

  return totalConsultaspacientes;
}

async function atualizarConsulta(req) {
  console.log(req.consulta)
  const { id, data, ...resto } = req.consulta;

  if (!id) {
    throw new Error("ID da consulta é obrigatório");
  }

  const consultaExistente = await prisma.Consultas.findUnique({ where: { id } });
  if (!consultaExistente) {
    throw new Error("Consulta não encontrada");
  }

  // Se a data for enviada, formata corretamente
  const dataAtualizada = data
    ? new Date(data.includes('T') ? data.split('T')[0] + "T00:00:00" : `${data}T00:00:00`).toISOString()
    : undefined;

  const dadosAtualizacao = {
    ...resto,
    ...(dataAtualizada ? { data: dataAtualizada } : {}) // Adiciona a data apenas se existir
  };

  if (Object.keys(dadosAtualizacao).length === 0) {
    throw new Error("Nenhum campo para atualização foi fornecido");
  }

  return await prisma.Consultas.update({
    where: { id },
    data: dadosAtualizacao
  });
}

module.exports = { getConsultas, getTotalConsultas, atualizarConsulta, getConsultasProfissional, getConsultasPorPaciente }