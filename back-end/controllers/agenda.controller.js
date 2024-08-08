const Profissional = require('../services/profissionais.service')

async function postAgendamentos(req, res, next){
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
async function getAgendamentos(req, res, next){
    try {
        const agenda = await Profissional.getAgendamentos(req.body)
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