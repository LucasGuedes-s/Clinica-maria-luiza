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
  return totalConsultas;
}


async function getConsultasPorProfissional(email) {
  const consultasporprofissional = await prisma.consultas.count({
      where: { profissionalId: email }
  });
  return consultasporprofissional;
}


async function getConsultasPorPaciente(cpf) {
  const consultasporpaciente = await prisma.consultas.count({
      where: { pacienteId: cpf }
  });
  return consultasporpaciente;
}


module.exports = { getConsultas, getTotalConsultas, getConsultasPorProfissional, getConsultasPorPaciente }