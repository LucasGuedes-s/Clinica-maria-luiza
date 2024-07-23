const Profissional = require('../services/profissionais.service')

async function getProfissionais(req, res, next){
    try {
        const profissionais = await Profissional.getProfissionais()
        console.log(profissionais)
        res.status(200).json({profissionais});
        next()
    } catch (err) {
        console.error(`Erro ao receber profissionais`);
    }
}
async function getProfissional(req, res, next){
    try {
        console.log(req.body)
        const profissional = await Profissional.getProfissional(req.body)
        res.status(200).json({profissional});
        next()
    } catch (err) {
        console.error(`Erro ao receber esse profissional`);
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
module.exports = {getProfissionais, getAgendamentos, getProfissional};