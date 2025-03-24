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


module.exports = { getConsultas, getTotalConsultas, getConsultasProfissional, getConsultasPorPaciente }