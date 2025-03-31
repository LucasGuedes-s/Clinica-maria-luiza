const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatar = require('../utils/formatdata.ultil')
const { DateTime } = require('luxon');
const { enviarNotificacaoAgendamento } = require('./emails.service');
require('dotenv').config();

async function agendarConsulta(req){  
    const paciente = await prisma.Pacientes.findUnique({
        where: { cpf: req.agenda.paciente }
    });
    const profissional = await prisma.Profissionais.findUnique({
        where: { email: req.agenda.profissional }
    });
    const data = new Date(req.agenda.data); // Valor vindo do front-end
    const data_ajustada = new Date(data.getTime() - data.getTimezoneOffset() * 60000);
    const agenda = await prisma.Agendamentos.create({
        data: {
			data: data_ajustada,
			agendamento: req.agenda.agendamento,
			notas: req.agenda.notas,
            status: "Andamento",
            pacienteId: paciente.cpf,
            profissionalId: profissional.email,
			sala: 2
          },
    });
    const agendamento = {
        email: paciente.email,
        data: agenda.data,
        nome: paciente.nome,
        profissional: profissional.nome
    }
    enviarNotificacaoAgendamento(agenda.profissionalId, agendamento)
    return agenda;
}
async function getAgendamentosPacientes(user){  

    const agenda = await prisma.Agendamentos.findMany({
        where: { 
            pacienteId: user,
            status: 'Andamento'
        },
        include: {
            profissional: {
              select: {
                nome: true,
              },
            },
          },
    });
    const Agendamentos = agenda.map(agendamento => {
        const { data, hora } = formatar.formatacao(agendamento.data);
        return {
            ...agendamento,
            dataFormatada: data,
        };
    });
    return Agendamentos;
}
async function getAgendamentos(usuario){  
    let whereCondition = {};
    if (usuario.permissao === 1 || usuario.email === process.env.email_recepcao) {
        // Se for admin, vê todas as consultas
        whereCondition = {}

    } else if (usuario.permissao === 2) {
        // Se for profissional, vê apenas as consultas que ele atende
        whereCondition = {
            profissionalId: usuario.email,
            status: 'Andamento'
        };
    }
    const agenda = await prisma.Agendamentos.findMany({
        where: whereCondition,
        include: {
            paciente: {
              select: {
                nome: true,
                telefone: true
              },
            },
            profissional:{
                select:{
                    nome:true
                }
            }
          },
    });

    const Agendamentos = agenda.map(agendamento => {
        // Suponho que formatar.formataao seja uma função de formatação de data
        const dataUTC = new Date(agendamento.data); // Aqui você cria a data no formato UTC
    
        // Extraindo data e hora de forma manual para evitar conversões de fuso horário
        const ano = dataUTC.getUTCFullYear();
        const mes = String(dataUTC.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const dia = String(dataUTC.getUTCDate()).padStart(2, '0');
        const hora = String(dataUTC.getUTCHours()).padStart(2, '0');
        const minuto = String(dataUTC.getUTCMinutes()).padStart(2, '0');
        const segundo = String(dataUTC.getUTCSeconds()).padStart(2, '0');
    
        const data = `${dia}/${mes}/${ano}`;
        const horaFormatada = `${hora}:${minuto}:${segundo}`;
    
        return {
            ...agendamento,
            dataFormatada: data,
            horaFormatada: horaFormatada,
        };
    });
    
    return Agendamentos;
}
async function updateAgendamentos(id){
    const dataAtual = new Date()
    const data = dataAtual.toISOString();
    const id_agendamento = parseInt(id);
    const agenda = await prisma.Agendamentos.update({
        where:{
            id: id_agendamento
        },
        data: {
            status: 'Concluida',
            data_conclusao: data,
        }
    });   
    return agenda;
}
module.exports = {agendarConsulta, getAgendamentos, getAgendamentosPacientes, updateAgendamentos};