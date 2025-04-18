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
async function postEstimulos(req, res) {
  const { nome_estimulo, descricao, pacienteId } = req.body;
  const estimulo = await prisma.Estimulos.create({
    data: {
      nome_estimulo,
      descricao,
    }
  });
  if(pacienteId === 'Não informado') {
    return "Paciente não informado";
  }
  const paciente = await prisma.Pacientes.findUnique({
    where: { cpf: pacienteId }
  });

  if (!paciente) {
    return "Paciente não encontrado";
  }

  const PacienteEstimulo = await prisma.PacienteEstimulo.create({
    data: {
      pacienteCpf: paciente.cpf,
      estimuloId: estimulo.id
    }
  });

  return {
    estimulo,
    pacienteEstimulo: PacienteEstimulo
  };
}
async function vincularEstimulo(req, res){
  const { estimuloId, pacienteId } = req.body;

  const PacienteEstimulo = await prisma.PacienteEstimulo.create({
    data: {
      pacienteCpf: pacienteId,
      estimuloId: estimuloId
    }
  });
  if (!PacienteEstimulo) {
    return "Erro ao vincular estimulo ao paciente";
  }
  return PacienteEstimulo
}

async function getEstimulos() {
  const estimulos = await prisma.Estimulos.findMany();
  return estimulos;
}

async function getEstimulosPorPaciente(pacienteId) {
  const estimulos = await prisma.PacienteEstimulo.findMany({
    where: {
      pacienteCpf: pacienteId // Ex: "138.845.747-25"
    },
    include: {
      estimulo: true
    }
  });

  return estimulos;
}


module.exports = { getConsultas, postEstimulos, vincularEstimulo, getEstimulos, getEstimulosPorPaciente, getTotalConsultas, atualizarConsulta, getConsultasProfissional, getConsultasPorPaciente }