const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');
const fs = require('fs');
const path = require('path');
const paciente = require('../pacientes.service')
const formatar = require('../../utils/formatdata.ultil')


function addFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    const data_hora = formatar.formatarDataHoraSeparados(new Date())
    for (let i = 0; i <= pageCount; i++) {
        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i); // Vai para a página específica
          doc.setFontSize(10);
      
          // Adiciona o texto do rodapé centralizado na parte inferior da página
          doc.text(
            `Página ${i} de ${pageCount}, documento retirado no dia ${data_hora.data} às ${data_hora.hora}h`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
          );
        }
    }
}
async function createReportPdf(usuario) {

    const doc = new jsPDF();
    const consultas = await paciente.getConsultas(usuario)
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');

    const imgHeight = 50;
    const imgWidth = 50;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    // Define as margens e adiciona o texto
    const eixox = 10; // Margem esquerda
    const eixoy = 70; // Posição vertical abaixo da imagem
    const lineHeight = 10; // Altura da linha
    const maxWidth = 190; // Largura máxima do texto
    console.log(consultas)
    const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))

    const patientInfo = `
    O paciente ${consultas.nome}, nascido em ${data_hora.data}, foi atendido na Clínica Maria Luíza. A seguir, são detalhados os dados de todas as consultas realizada sob esse paciente na clínica.   
    `;
    doc.setFontSize(12);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    doc.text(patientInfo.split('\n'), eixox, eixoy, { maxWidth: maxWidth, lineHeight: lineHeight });

    // Cabeçalhos da tabela
    const tableColumn = ["Consulta", "Data", "Descrição", "Profissional"];

    // Inicializando as linhas da tabela
    const tableRows = [];

    consultas.consultas.forEach(consulta => {
        const row = [
            consulta.consulta,
            new Date(consulta.data).toLocaleDateString(),  // Formata a data
            consulta.descricao,
            consulta.profissionalId,
        ];
        tableRows.push(row);
    });
    const tableStartY = eixoy + (lineHeight * patientInfo.split('\n').length) + 0; // Ajuste conforme necessário

    // Adicionando as colunas da tabela
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: tableStartY,
        theme: 'grid',
        headStyles: {
            fillColor: [132, 231, 255], // Cor de fundo do cabeçalho (em RGB)
        },
    });
    addFooter(doc);
    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
async function pdfConsulta(consulta) {

    const doc = new jsPDF();
    const consultas = await paciente.getConsulta(consulta)
    console.log(consultas)
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');

    const imgHeight = 50;
    const imgWidth = 50;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    // Define as margens e adiciona o texto
    const eixox = 10; // Margem esquerda
    const eixoy = 70; // Posição vertical abaixo da imagem
    const lineHeight = 10; // Altura da linha
    const maxWidth = 190; // Largura máxima do texto

    const patientInfo = `
    O paciente , foi atendido na clínica Maria Luíza. A seguir, são detalhados os dados de todas as consultas realizada sob esse paciente na clínica.   
    `;
    doc.setFontSize(12);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    doc.text(patientInfo.split('\n'), eixox, eixoy, { maxWidth: maxWidth, lineHeight: lineHeight });

    // Cabeçalhos da tabela
    const tableColumn = ["Consulta", "Data", "Descrição", "Profissional", "Laudos", "Foto"];

    // Inicializando as linhas da tabela
    const tableRows = [];

    consultas.consultas.forEach(consulta => {
        const row = [
            consulta.consulta,
            new Date(consulta.data).toLocaleDateString(),  // Formata a data
            consulta.descricao,
            consulta.profissionalId,
        ];
        tableRows.push(row);
    });
    const tableStartY = eixoy + (lineHeight * patientInfo.split('\n').length) + 0; // Ajuste conforme necessário

    // Adicionando as colunas da tabela
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: tableStartY,
        theme: 'grid',
        headStyles: {
            fillColor: [132, 231, 255], // Cor de fundo do cabeçalho (em RGB)
        },
    });
    addFooter();

    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
module.exports = { createReportPdf, pdfConsulta, addFooter }