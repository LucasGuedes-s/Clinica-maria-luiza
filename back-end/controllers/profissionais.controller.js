const profissional = require('../services/profissionais.service')

async function getProfissionais(req, res, next){
    try {
        const profissionais = await profissional.getProfissionais()
        console.log(profissionais)
        res.status(200).json({profissionais});
        next()
    } catch (err) {
        console.error(`Erro ao receber profissionais`);
    }
    
}
async function getAgendamentos(req, res, next){
    try {
        const agenda = await profissional.getAgendamentos(req.body)
        res.status(200).json({agenda});
        next()
    } catch (err) {
        console.error(`Erro ao receber agenda do usuário`);
    }
    
}
module.exports = {getProfissionais, getAgendamentos};