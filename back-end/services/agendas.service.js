const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function agendarConsulta(req){  
    console.log(req)
      // Primeiro, encontre o paciente pelo CPF
    const paciente = await prisma.Pacientes.findUnique({
        where: { cpf: req.agenda.paciente }
    });

    // Encontre o profissional pelo email
    const profissional = await prisma.Profissionais.findUnique({
        where: { email: req.agenda.profissional }
    });
    const agenda = await prisma.Agendamentos.create({
        data: {
			data: new Date(),
			agendamento: req.agenda.agendar,
			notas: req.agenda.notas,
            status: "Andamento",
            pacienteId: paciente.id,
            profissionalId: profissional.id,
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