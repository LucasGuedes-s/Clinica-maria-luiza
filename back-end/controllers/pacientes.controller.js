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
async function postPacientes(req, res, next){
    try {
        console.log("Cheguei aqui")
        const pacientes = ''
        //const pacientes = await Paciente.getPacientes()
        res.status(200).json({pacientes});
        next()
    } catch (err) {
        console.error(`Erro ao receber os pacientes`);
    }
}
module.exports = {getPacientes, postPacientes};