const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');

async function createReportPdf(nome) {
    console.log(nome)
    const doc = new jsPDF();

    /*const imgData = 'https://firebasestorage.googleapis.com/v0/b/clinica-maria-luiza.appspot.com/o/uploads%2Fgirafas.png?alt=media&token=576a35f6-3bb8-4156-b554-4ee7605c55bc'; // Substitua pelo seu base64
    const imgWidth = 50;
    const imgHeight = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);*/

    // Adicionando a tabela
    const tableColumn = ["Nome", "Idade", "Cargo"];
    const tableRows = [
        ["Lucas", "55", "Programador"],
        ["Jefferson", "26", "Engenheiro"],
        ["João Paulo", "24", "Web Designer"]
    ];

    // Definindo a posição inicial da tabela
    let startY = 70;

    // Adicionando as colunas da tabela
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'grid'
    });

    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
module.exports = { createReportPdf }