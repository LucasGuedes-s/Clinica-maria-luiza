const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');
const fs = require('fs');
const path = require('path');
const paciente = require('../pacientes.service')

async function createReportPdf(usuario) {

    const doc = new jsPDF();
    const consultas = await paciente.getConsultas(usuario)
    console.log(consultas)
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');

    const imgHeight = 50;
    const imgWidth = 50;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    const patientInfo = `
        Nome: João da Silva
        Idade: 30 anos
        Data da Consulta: 22/08/2024
    `;

    doc.setFontSize(12);
    doc.text(patientInfo, 10, 70);

    // Cabeçalhos da tabela
    const tableColumn = ["Consulta", "Data", "Descrição", "Profissional", "Laudos", "Foto"];

    // Inicializando as linhas da tabela
    const tableRows = [];

    consultas.forEach(consulta => {
        const row = [
            consulta.consulta,
            new Date(consulta.data).toLocaleDateString(),  // Formata a data
            consulta.descricao,
            consulta.profissionalId,
        ];
        tableRows.push(row);
    });

    // Adicionando a tabela ao PDF
    let startY = 70;

    // Adicionando as colunas da tabela
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'grid',
        headStyles: {
            fillColor: [132, 231, 255], // Cor de fundo do cabeçalho (em RGB)
        },
    });

    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
module.exports = { createReportPdf }