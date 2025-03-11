const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatar = require('../utils/formatdata.ultil')
const { DateTime } = require('luxon');
const { enviarNotificacaoAgendamento } = require('./emails.service');

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
    //console.log(agenda)
    //console.log(paciente)
    // console.log(profissional)
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
        const { data, hora } = formatar.formatarDataHoraSeparados(agendamento.data);
        return {
            ...agendamento,
            dataFormatada: data,
            horaFormatada: hora,
        };
    });
    return Agendamentos;
}
async function getAgendamentos(user){  

    const agenda = await prisma.Agendamentos.findMany({
        where: { 
            profissionalId: user,
            status: 'Andamento'
        },
        include: {
            paciente: {
              select: {
                nome: true,
              },
            },
          },
    });
    const Agendamentos = agenda.map(agendamento => {
        const { data, hora } = formatar.formatarDataHoraSeparados(agendamento.data);
        return {
            ...agendamento,
            dataFormatada: data,
            horaFormatada: hora,
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