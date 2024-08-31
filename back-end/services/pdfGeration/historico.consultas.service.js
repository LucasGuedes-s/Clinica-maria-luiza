const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');
const fs = require('fs');
const path = require('path');
const paciente = require('../pacientes.service')
const formatar = require('../../utils/formatdata.ultil')
const { getImageAsBase64 } = require('../../utils/img.ultil');

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
    const imgHeight = 40;
    const imgWidth = 40;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    const firstImageY = 10 + imgHeight + 10;
    // Definir as dimensões da segunda imagem
    const secondImageWidth = 50;
    const secondImageHeight = 50;

    // Posicionar a segunda imagem e o texto abaixo da primeira imagem
    const secondImageX = 10; // Posição X da segunda imagem
    const secondImageY = firstImageY + 5; // Posição Y abaixo da primeira imagem

    const textX = secondImageX + secondImageWidth + 10; // Texto ao lado direito da segunda imagem
    const textY = secondImageY + 10; 

    const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))

    const patientInfo = `
    Nome: ${consultas.nome};
Nascido em ${data_hora.data};

Foi atendido na Clínica Maria Luíza. A seguir, são detalhados os dados de todas as consultas realizada sob esse paciente na clínica.   
    `;
    doc.setFontSize(14);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    doc.text(patientInfo.trim(), textX, textY, { maxWidth: 130, lineHeight: 1.5 });
    
    const inicio = new Date().getTime();
    const image = await getImageAsBase64(consultas.foto);
    doc.addImage(image, 'JPEG', secondImageX, secondImageY, secondImageWidth, secondImageHeight);
    var fim = new Date().getTime();

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

    const lineHeight = 10; // Altura da linha
    const tableStartY = textY + (lineHeight * patientInfo.split('\n').length) + 1; // Ajuste conforme necessário

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

    var tempo = fim - inicio;

    console.log('Tempo de execução: ' + tempo);
    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
async function pdfConsulta(id) {
    const doc = new jsPDF();
    const consult = await paciente.getConsulta(id)
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');
    const imgHeight = 40;
    const imgWidth = 40;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    const firstImageY = 10 + imgHeight + 10;
    // Definir as dimensões da segunda imagem
    const secondImageWidth = 50;
    const secondImageHeight = 50;

    // Posicionar a segunda imagem e o texto abaixo da primeira imagem
    const secondImageX = 10; // Posição X da segunda imagem
    const secondImageY = firstImageY; // Posição Y abaixo da primeira imagem

    const textX = secondImageX + secondImageWidth + 10; // Texto ao lado direito da segunda imagem
    const textY = secondImageY + 10; 

    const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))

    const patientInfo = `
    Nome: ${consultas.nome};
Nascido em ${data_hora.data};

Foi atendido na data de -- pela profissional --
    `;
    doc.setFontSize(14);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    doc.text(patientInfo.trim(), textX, textY, { maxWidth: 130, lineHeight: 1.5 });

    const image = await getImageAsBase64(consultas.foto);
    doc.addImage(image, 'JPEG', secondImageX, secondImageY, secondImageWidth, secondImageHeight);

    const texto = textY + (lineHeight * patientInfo.split('\n').length) + 1; // Ajuste conforme necessário
    const consulta = `
    Nome: ${consultas.nome};
Nascido em ${data_hora.data};

Foi atendido na data de -- pela profissional --
    `;
    doc.text(consulta.trim(),texto)
    addFooter(doc);
    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
module.exports = { createReportPdf, pdfConsulta, addFooter }