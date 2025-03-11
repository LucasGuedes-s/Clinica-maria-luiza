const consultas = require('../services/consultas.service')

async function getTodasConsultas(req, res, next){
    try {
        const todas_consultas = await consultas.getConsultas()
        res.status(200).json({todas_consultas});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao dar get em consultas`);
    }
}
module.exports = { getTodasConsultas };