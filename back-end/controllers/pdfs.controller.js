//const Paciente = require('../services/pacientes.service')
const pdf = require('../services/pdfGeration/historico.consultas.service.js')

async function getpdfConsultas(req, res){

    const pdfBuffer = await pdf.createReportPdf('Lucas Guedes')
    // Envie o PDF como resposta
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf');
    res.send(Buffer.from(pdfBuffer));
    
    /*try {
        const pdfBytes = await pdf.createReportPdf('Título do Relatório', 'Conteúdo do Relatório');
        console.log(pdfBytes)
        // Configura o cabeçalho da resposta para download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');
        
        // Envia o PDF como resposta binária
        res.status(200).send(pdfBytes);
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
        res.status(500).send("Erro ao gerar o PDF");
    }*/
};

module.exports = { getpdfConsultas }