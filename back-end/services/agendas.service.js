const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatar = require('../utils/formatdata.ultil')
const { DateTime } = require('luxon');

async function agendarConsulta(req){  
    console.log(req)
    const data = new Date(req.agenda.data);

    // Ajuste manual para UTC-3 (horário de Brasília)
    const offset = -3 * 60; // Deslocamento de UTC-3 em minutos
    const dataAjustada = new Date(data.getTime() - (offset * 60 * 1000));

    console.log(dataAjustada.toISOString()); // Verifique a data no formato ISO 8601

    const paciente = await prisma.Pacientes.findUnique({
        where: { cpf: req.agenda.paciente }
    });

    const profissional = await prisma.Profissionais.findUnique({
        where: { email: req.agenda.profissional }
    });
    //const data = DateTime.fromISO(req.agenda.data, { zone: 'America/Sao_Paulo' });

    const agenda = await prisma.Agendamentos.create({
        data: {
			data: data,
			agendamento: req.agenda.agendamento,
			notas: req.agenda.notas,
            status: "Andamento",
            pacienteId: paciente.cpf,
            profissionalId: profissional.email,
			sala: 2
          },
    });
    return agenda;
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
module.exports = {agendarConsulta, getAgendamentos, updateAgendamentos};