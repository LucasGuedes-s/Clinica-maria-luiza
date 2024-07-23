const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getPacientes(){  
    const pacientes = await prisma.Pacientes.findMany();
    return pacientes;
}
async function cadastrarPaciente(){  
    const pacientes = await prisma.Pacientes.create({
        
    });
    return pacientes;
}
module.exports = {getPacientes, cadastrarPaciente};