const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getPacientes(){  
    const pacientes = await prisma.Pacientes.findMany();
    return pacientes;
}
async function getPaciente(id){  
    const pacientes = await prisma.Pacientes.findMany({
        where:{
            cpf: id.cpf
        }
    });
    return pacientes;
}
async function cadastrarPaciente(req){  
    const pacientes = await prisma.Pacientes.create({
        data: {
            cpf: req.paciente.cpf,
            email: req.paciente.email,
            nome: req.paciente.nome,
            nome_mae: req.paciente.nome_mae,
            data_nascimento: req.paciente.data_nascimento,
            telefone: req.paciente.telefone,
            endereco: req.paciente.endereco,
            foto: req.paciente.foto,
        }
    });

    return pacientes;
}
module.exports = {getPacientes, cadastrarPaciente};