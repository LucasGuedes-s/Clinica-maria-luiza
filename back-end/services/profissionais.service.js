const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getProfissionais(){   
    const profissionais = await prisma.Profissionais.findMany();
    return profissionais;
}
async function getAgendamentos(user){  
    const Agendamentos = await prisma.Agendamentos.findMany({
        where: {
            profissionalId: user.usuario.email
        }
    });
    return Agendamentos;
}

module.exports = {getProfissionais, getAgendamentos};