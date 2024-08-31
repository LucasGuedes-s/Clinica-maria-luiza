//const Paciente = require('../services/pacientes.service')
const pdf = require('../services/pdfGeration/historico.consultas.service.js')
const pdfpagamentos = require('../services/pdfGeration/historico.pagamentos.service.js')

async function getpdfConsultas(req, res){
    console.log("Aqui")

    const pdfBuffer = await pdf.createReportPdf(req.params.id)
    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};
async function getpdfConsulta(req, res){
    const pdfBuffer = await pdf.createReportPdf(req.body)

    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};
async function getpdfPagamento(req, res){
    console.log(req.body)
    const pdfBuffer = await pdfpagamentos.pdfPagamentos(req.body)
    // Envie o PDF como resposta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
};
module.exports = { getpdfConsultas, getpdfConsulta, getpdfPagamento }