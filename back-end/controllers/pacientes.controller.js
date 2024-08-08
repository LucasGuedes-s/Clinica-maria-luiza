const Paciente = require('../services/pacientes.service')

async function getPacientes(req, res, next){
    try {
        const pacientes = await Paciente.getPacientes()
        res.status(200).json({pacientes});
        next()
    } catch (err) {
        console.error(`Erro ao receber os pacientes`);
    }
}
async function getConsultas(req, res, next){
    try {
        const consultas = await Paciente.getConsultas(req.body)
        res.status(200).json({consultas});
        next()
    } catch (err) {
        console.error(`Erro ao receber as consultas do paciente ${req.body}`);
    }
}
async function postPacientes(req, res, next){
    try {
        const pacientes = await Paciente.cadastrarPaciente(req.body)
        res.status(200).json({pacientes});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao receber os pacientes`);
    }
}
async function postConsulta(req, res, next){
    try {
        const consulta = await Paciente.registrarConsulta(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar a consulta`);
    }
}
module.exports = {getPacientes, getConsultas, postPacientes, postConsulta};