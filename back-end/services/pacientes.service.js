const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function getPacientes(){  
    const pacientes = await prisma.Pacientes.findMany();
    return pacientes;
}
async function getConsultas(user){
    console.log(user)
    console.log(user.id.cpf)

    const paciente = await prisma.Pacientes.findUnique({
        where: {
          cpf: user.id.cpf
        }
      });
      // Verifica se o paciente foi encontrado
      if (paciente) {
        // Buscar consultas associadas ao paciente encontrado
        const consultas = await prisma.Consultas.findMany({
          where: {
            pacienteId: user.id.cpf // Usando o identificador único do paciente
          }
        });
        return consultas;
    }
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
async function registrarConsulta(req){  
    const consulta = await prisma.Consultas.create({
        data: {
            consulta: req.consulta.consulta,
            descricao: req.consulta.descricao,
            paciente: {
                connect: { cpf: req.consulta.pacienteId }
              },
              profissional: {
                connect: { email: req.consulta.profissionalId}
              },
            laudos: req.consulta.laudos,
            foto: req.consulta.foto
        }
    });

    return consulta;
}
module.exports = {getPacientes, getConsultas, cadastrarPaciente, registrarConsulta};