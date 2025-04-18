const Agendamentos = require('../services/agendas.service')

async function postAgendamentos(req, res, next){
    try {
        const consulta = await Agendamentos.agendarConsulta(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        res.status(500)
        console.log(err)
        console.error(`Erro ao registrar agendamento do profissional`);
    }
}
async function updateOrDeleteAgendamento(req, res, next){
    try {
        const consulta = await Agendamentos.atualizarOuDeletarAgendamento(req.body)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        res.status(500)
        console.log(err)
        console.error(`Erro ao atualizar agendamento para profissional`);
    }
}
async function getAgendamentos(req, res, next){
    try {
        const { agenda, totalConsultas} = await Agendamentos.getAgendamentos(req.user)
        res.status(200).json({ agenda, totalConsultas });
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao receber agenda do usuário`);
    }
    
}
async function getAgendamentosPacientes(req, res, next){
    try {
        const agenda = await Agendamentos.getAgendamentosPacientes(req.params.id)
        res.status(200).json({agenda});
        next()
    } catch (err) {
        console.error(`Erro ao receber agenda do usuário`);
    }
    
}
async function updateAgendamentos(req, res, next){
    try {
        const consulta = await Agendamentos.updateAgendamentos(req.params.id)
        res.status(200).json({consulta});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao registrar agendamento para profissional`);
    }
}
module.exports = {postAgendamentos, updateOrDeleteAgendamento, getAgendamentos, getAgendamentosPacientes, updateAgendamentos};