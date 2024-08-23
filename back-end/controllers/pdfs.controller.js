//const Paciente = require('../services/pacientes.service')
const pdf = require('../services/pdfGeration/historico.consultas.service.js')

async function getpdfConsultas(req, res){

    const pdfBuffer = await pdf.createReportPdf(req.params.id)
    // Envie o PDF como resposta
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};

module.exports = { getpdfConsultas }