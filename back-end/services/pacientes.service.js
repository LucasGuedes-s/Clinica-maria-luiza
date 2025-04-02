const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil")
require('dotenv').config();
const { DateTime }= require('luxon');
const { zonedTimeToUtc } = require('date-fns-tz');

async function loginPaciente(user) {
  if (!user) {
    throw new Error('Identificador necessário'); // Lança um erro se user for inválido
  }

  const paciente = await prisma.Pacientes.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: user,
            mode: 'insensitive',
          },
        },
        { cpf: user },
      ],
    },
    include: {
      paciente_dados: true, // Inclui os dados da tabela Pacientes_dados
    },
  });

  // Retorna o paciente encontrado ou null se não houver
  return paciente || null; 
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
async function getConsultas(req, user) {
  let whereCondition = {};

  if (user.permissao === 1) {
      // Se for admin, vê todas as consultas
      whereCondition = {cpf: req};

  } else if (user.permissao === 2) {
      // Se for profissional, vê apenas as consultas que ele atende
      whereCondition = {
          cpf: req, // Usando o identificador único do paciente
          profissional: {
              email: user.email // Ou id, dependendo do seu schema
          }
      };
  }

  const consultas = await prisma.Pacientes.findUnique({
    where: whereCondition,
    include: {
      consultas: {
        include: {
          profissional: true // Garante que toda a relação do profissional seja carregada
        },
        orderBy: { consulta: 'asc' } // Ordena as consultas por tipo
      }
    }
  });
  return consultas;
}

async function getConsultasAba(req, user) {
  let whereCondition = {};

  if (user.permissao === 1) {
      // Se for admin, vê todas as consultas
      whereCondition = {pacienteId: req};
  } else if (user.permissao === 2) {
      // Se for profissional, vê apenas as consultas que ele atende
      whereCondition = {
          pacienteId: req, // Usando o identificador único do paciente
          profissional: {
              email: user.email // Ou id, dependendo do seu schema
          }
      };
  }
  const consultas = await prisma.ConsultaAba.findMany({
    where: whereCondition,

    include: {
      profissional: { // Nome do campo que define a relação no seu schema
        select: {
          nome: true // Seleciona apenas o campo 'nome' do profissional
        }
      }
    },
    orderBy: {
      data: 'desc' // Ordena as consultas da mais recente para a mais antiga
    }
  });

  return consultas;
}

async function getTodasConsultasAba(req) {
  const consultas = await prisma.ConsultaAba.findMany({
    where: {
      pacienteId: req // Filtra pelo ID do paciente
    },
    include: {
      profissional: {
        select: {
          nome: true
        }
      },
      paciente: {
        select: {
          nome: true
        }
      }
    },
    orderBy: {
      data: 'desc'
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
      laudos: req.paciente.laudos,
      tipo_paciente: req.paciente.tipo_paciente,
      foto: req.paciente.foto,
    }
  });

  return pacientes;
}
async function registrarConsulta(req) {
  const adicionarData = (dateString) => {
    if (!dateString) {
      // Se a data for null, pega a data atual no fuso de Brasília
      const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      const [date] = now.split(', ');
      const [day, month, year] = date.split('/').map(Number);
      return new Date(year, month - 1, day, 0, 0, 0, 0); // Retorna a data com hora zerada
    }
    // Se a data já vier no formato "YYYY-MM-DDTHH:mm:ss.sssZ", extrai só a parte da data
    if (dateString.includes('T')) {
      return new Date(dateString.split('T')[0] + "T00:00:00"); // Garante que a hora seja zerada
    }

    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  };
  
  const localDate = adicionarData(req.consulta.data)

  const paciente = await prisma.Pacientes.findUnique({
    where: { cpf: req.consulta.pacienteId }
  });
  if (!paciente) {
    throw new Error('Paciente não encontrado');
  }
  const consulta = await prisma.Consultas.create({
    data: {
      consulta: req.consulta.consulta,
      data: localDate.toISOString(),
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

  const adicionarData = (dateString) => {
    if (!dateString) {
      // Se a data for null, pega a data atual no fuso de Brasília
      const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      const [date] = now.split(', ');
      const [day, month, year] = date.split('/').map(Number);
      return new Date(year, month - 1, day, 0, 0, 0, 0); // Retorna a data com hora zerada
    }
    // Se a data já vier no formato "YYYY-MM-DDTHH:mm:ss.sssZ", extrai só a parte da data
    if (dateString.includes('T')) {
      return new Date(dateString.split('T')[0] + "T00:00:00"); // Garante que a hora seja zerada
    }

    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  };
  
  const localDate = adicionarData(req.consulta.data)
  
  const consulta = await prisma.ConsultaAba.create({
    data: {
      paciente: {
        connect: { cpf: req.consulta.pacienteId }
      },
      profissional: {
        connect: { email: req.consulta.profissionalId }
      },
      data: localDate.toISOString(),
      hora_inicio: req.consulta.inicio,
      hora_fim: req.consulta.fim,
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
async function updateConsultaAba(req) {
  const update_consulta = await prisma.ConsultaAba.update({
    where:{
      pacientes: req.consultaAba.id
    },
    data: {
      data: new Date(req.consultaAba.data),
      hora_inicio: req.consultaAba.inicio,
      hora_fim: req.consultaAba.fim,
      descricao_atividade: req.consultaAba.descricao,
      Aplicacao1:  req.consultaAba.aplicacao1,
      Aplicacao2:  req.consultaAba.aplicacao2,
      Aplicacao3:  req.consultaAba.aplicacao3,
      Aplicacao4:  req.consultaAba.aplicacao4,
      Aplicacao5:  req.consultaAba.aplicacao5,
      teste:       req.consultaAba.teste,
      observacoes: req.consultaAba.observacoes,      
      foto:        req.consultaAba.foto
    }
  });
  return update_consulta;
}
async function postLaudos(dados) {
  const paciente = await prisma.Pacientes.findFirst({
    where: {
      OR: [
        { email: dados.email },
        { cpf: dados.cpf }
      ]
    }
  });
  const laudoPaciente = await prisma.Pacientes.update({
    where: {
      cpf: paciente.cpf    

    },
    data: {
      laudos: {
        push: dados.laudo // Adiciona o novo laudo ao array existente
      }
    }
  });

  return laudoPaciente;
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
async function deleteConsultaAba(id) {
  const deletar = await prisma.ConsultaAba.delete({
    where:{
      pacientes: parseInt(id)
    }
  });
  return deletar;
}
async function updateDadosPaciente(req) {
  const paciente = await prisma.Pacientes.findMany({
    where: {
      OR: [
        { email: req.dados.email },   
        { cpf: req.dados.cpf }       
      ]
    },
    include: {
      paciente_dados: true // Inclui os dados da tabela Pacientes_dados
    }
  });

  if (!paciente) {
    throw new Error("Paciente não encontrado.");
  }
  const pacienteAtualizado = await prisma.Pacientes.update({
    where: {
      cpf: paciente[0].cpf,  // Usa o CPF se fornecido
    },
    data: {
      cpf: req.dados.cpf,  //  CPF é identificador único
      nome: req.dados.nome,
      email: req.dados.email,
      telefone: req.dados.telefone,
      endereco: req.dados.endereco,
      foto: req.dados.foto,
    }
  })
  const pacienteId = paciente[0].cpf; // O CPF do paciente como identificador

  const dadosAtualizados = await prisma.Pacientes_dados.upsert({
    where: {
      pacienteId: pacienteId, // Usando o pacienteId como identificador único
    },
    update: {
      peso: req.dados.peso !== undefined && req.dados.peso !== '' ? parseFloat(req.dados.peso) : null,
      altura: req.dados.altura !== undefined && req.dados.altura !== '' ? parseFloat(req.dados.altura) : null,
      comestiveis: req.dados.comestiveis !== undefined && req.dados.comestiveis !== '' ? req.dados.comestiveis : null,
      tangiveis: req.dados.tangiveis !== undefined && req.dados.tangiveis !== '' ? req.dados.tangiveis : null,
      fisicos: req.dados.fisicos !== undefined && req.dados.fisicos !== '' ? req.dados.fisicos : null,
      data_neuro: req.dados.data_neuro ? new Date(req.dados.data_neuro) : null,
      alergicos: req.dados.alergicos !== undefined && req.dados.alergicos !== '' ? req.dados.alergicos : null,
    },
    create: {
      pacienteId: pacienteId,
      peso: req.dados.peso !== undefined && req.dados.peso !== '' ? parseFloat(req.dados.peso) : null,
      altura: req.dados.altura !== undefined && req.dados.altura !== '' ? parseFloat(req.dados.altura) : null,
      comestiveis: req.dados.comestiveis !== undefined && req.dados.comestiveis !== '' ? req.dados.comestiveis : null,
      tangiveis: req.dados.tangiveis !== undefined && req.dados.tangiveis !== '' ? req.dados.tangiveis : null,
      fisicos: req.dados.fisicos !== undefined && req.dados.fisicos !== '' ? req.dados.fisicos : null,
      data_neuro: req.dados.data_neuro ? new Date(req.dados.data_neuro) : null,
      alergicos: req.dados.alergicos !== undefined && req.dados.alergicos !== '' ? req.dados.alergicos : null,
    },
  });
  // Retornar os dados atualizados ou criados
  return {
    paciente: pacienteAtualizado,
    dadosPaciente: dadosAtualizados,
  };
}
module.exports = {getTodasConsultasAba, loginPaciente, getPacientes, postLaudos, updateConsultaAba, getPaciente, getConsultas, getConsulta, getConsultasAba, cadastrarDados, cadastrarPaciente, registrarConsulta, registrarConsultaAba, deleteConsultaAba, updateDadosPaciente};