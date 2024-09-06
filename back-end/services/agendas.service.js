const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const formatar = require('../utils/formatdata.ultil')

async function agendarConsulta(req){  
    const paciente = await prisma.Pacientes.findUnique({
        where: { cpf: req.agenda.paciente }
    });
    console.log(paciente)
    const profissional = await prisma.Profissionais.findUnique({
        where: { email: req.agenda.profissional }
    });

    const agenda = await prisma.Agendamentos.create({
        data: {
			data: new Date(),
			agendamento: req.agenda.agendar,
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