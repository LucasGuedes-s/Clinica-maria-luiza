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
async function getTotalConsultas(req, res) {
    try {
        const totalConsultas = await consultas.getTotalConsultas();  
        res.status(200).json({ totalConsultas });
    } catch (err) {
        console.error('Erro ao obter contagem total de consultas:', err);
        res.status(500).json({ error: 'Erro ao obter contagem total de consultas' });
    }
}

async function getConsultasProfissional(req, res, next) {
    try {
        const { email } = req.params;
        const consultasProfissional = await consultas.getConsultasProfissional(email); 
        res.status(200).json({ profissional: email, consultas: consultasProfissional });
        next();
    } catch (err) {
        console.error(`Erro ao obter consultas por profissional: ${err}`);
        res.status(500).json({ error: "Erro ao buscar consultas do profissional." });
    }
}

async function getConsultasPorPaciente(req, res, next) {
    try {
        const { cpf } = req.params;
        const consultasPaciente = await consultas.getConsultasPorPaciente(cpf);  // Soma as consultas do paciente (tradicionais + ABAS)
        res.status(200).json({ paciente: cpf, consultas: consultasPaciente });
        next();
    } catch (err) {
        console.error(`Erro ao obter consultas por paciente: ${err}`);
        res.status(500).json({ error: "Erro ao buscar consultas do paciente." });
    }
}
async function updateConsulta(req, res, next) {
    try {
        const consulta = await consultas.atualizarConsulta(req.body);  // Soma as consultas do paciente (tradicionais + ABAS)
        res.status(200).json({ consulta });
        next();
    } catch (err) {
        console.error(`Erro ao atualizar consultas por paciente: ${err}`);
        res.status(500).json({ error: "Erro ao buscar consultas do paciente." });
    }
}

module.exports = { getTodasConsultas, getTotalConsultas, getConsultasProfissional, getConsultasPorPaciente, updateConsulta};