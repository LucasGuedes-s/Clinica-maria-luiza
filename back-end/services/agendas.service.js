const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function agendarConsulta(req){  
    console.log(req)
    const agenda = await prisma.Agendamentos.create({
        data: {
			data: new Date(),
			agendamento: req.agenda.agendar,
			notas: req.agenda.notas,
            status: "Andamento",
            pacienteId: {
                connect: { cpf: req.agenda.paciente}
            },
            profissionalId: {
                connect: { email: req.agenda.profissional}
            },
			sala: 2
          },
    });
    return agenda;
}
async function getAgendamentos(user){  
    const Agendamentos = await prisma.Agendamentos.findMany({
        where: {
            profissionalId: user.usuario.email
        }
    });
    return Agendamentos;
}
module.exports = {agendarConsulta, getAgendamentos};