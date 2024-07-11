const profissional = require('../services/profissionais.service')

async function getProfissionais(req, res, next){
    try {
        const profissionais = await profissional.getProfissionais()
        console.log(profissionais)
        res.status(200).json({profissionais});
        next()
    } catch (err) {
        console.error(`Erro ao receber usuários`);
    }
    
}
module.exports = {getProfissionais};