const Agendamentos = require('../services/agendas.service')

async function postAgendamentos(req, res, next){
    try {
        const consulta = await Agendamentos.agendarConsulta(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar agendamento para profissional`);
    }
}
async function getAgendamentos(req, res, next){
    try {
        const agenda = await Agendamentos.getAgendamentos(req.body)
        res.status(200).json({agenda});
        next()
    } catch (err) {
        console.error(`Erro ao receber agenda do usuário`);
    }
    
}

async function updateAgendamentos(req, res, next){
    try {
        const consulta = 'Aqui'
        //const consulta = await Paciente.agendarConsulta(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar agendamento para profissional`);
    }
}
module.exports = {postAgendamentos, getAgendamentos, updateAgendamentos};