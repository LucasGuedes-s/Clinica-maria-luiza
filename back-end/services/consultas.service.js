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

  return {totalConsultas: totalConsultas, totalConsultasAba: totalConsultasAba};
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

async function atualizarConsulta(dados) {
  const { id, data, ...resto } = dados;

  if (!id) {
    throw new Error("ID da consulta é obrigatório");
  }

  const consultaExistente = await prisma.Consultas.findUnique({ where: { id } });
  if (!consultaExistente) {
    throw new Error("Consulta não encontrada");
  }

  const dataConvertida = data
    ? new Date(data.includes('T') ? data : `${data}T00:00:00`)
    : undefined;

  const dadosAtualizacao = {
    ...resto,
    ...(dataConvertida ? { data: dataConvertida } : {})
  };

  if (Object.keys(dadosAtualizacao).length === 0) {
    throw new Error("Nenhum campo para atualização foi fornecido");
  }

  return await prisma.Consultas.update({
    where: { id },
    data: {
      consulta: dadosAtualizacao.consulta,
      descricao: dadosAtualizacao.descricao,
      data: dadosAtualizacao.data,
      laudos: dadosAtualizacao.laudos
    }
  });
}


module.exports = { getConsultas, getTotalConsultas, atualizarConsulta, getConsultasProfissional, getConsultasPorPaciente }