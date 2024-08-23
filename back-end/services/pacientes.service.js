const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcryptUtil = require("../utils/bcrypt.ultil")
require('dotenv').config();

async function getPacientes(){  
    /*const pacientes = await prisma.Pacientes.findMany({
      include: {
        paciente_dados: true // Inclui os dados da tabela Pacientes_dados
      }
    }); */
    const pacientes = await prisma.Pacientes.findMany();
    return pacientes;
}
async function getConsultas(user){
    const paciente = await prisma.Pacientes.findUnique({
        where: {
          cpf: user
        }
      });
      console.log(paciente)
      // Verifica se o paciente foi encontrado
      if (paciente) {
        // Buscar consultas associadas ao paciente encontrado
        const consultas = await prisma.Consultas.findMany({
          where: {
            pacienteId: user // Usando o identificador único do paciente
          }
        });
        console.log(consultas)

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
async function postPaciente(user){  
  console.log(user)
  let senha_user = bcryptUtil.hash(user.usuario.senha);

  await prisma.Pacientes.create({
      data: {
          email: user.usuario.email,
          senha: senha_user,
          nome: user.usuario.nome,
          telefone: user.usuario.telefone,
          foto: user.usuario.foto,
          identificador: user.usuario.identificador,
          permissaoId: user.usuario.permissaoId,
        },
  });
  return;
}
module.exports = {getPacientes, getConsultas, postPaciente, cadastrarPaciente, registrarConsulta};