async function getPacientes(req, res, next){
    try {
        console.log("Cheguei aqui")
        res.status(200).json({});
        next()
    } catch (err) {
        console.error(`Erro`);
    }
    
}
module.exports = {getPacientes};