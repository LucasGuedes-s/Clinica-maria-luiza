const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');

const fs = require('fs');
const path = require('path');
const pagamentos = require('../pagamentos.service')
const formatar = require('../../utils/formatdata.ultil')
function getMonthName(monthNumber) {
    const monthNames = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho", 
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
  
    // Ajusta o mês para ser indexado de 0 (Janeiro) a 11 (Dezembro)
    return monthNames[monthNumber - 1];
  }

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
async function pdfPagamentos(mes_ano) {

    const doc = new jsPDF();
    const pagamento = await pagamentos.getPagamentoMes(mes_ano)

    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');

    const imgHeight = 50;
    const imgWidth = 50;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    // Define as margens e adiciona o texto
    const eixox = 10; // Margem esquerda
    const eixoy = 70; // Posição vertical abaixo da imagem
    const lineHeight = 10; // Altura da linha
    const maxWidth = 190; // Largura máxima do texto

    const mes = getMonthName(mes_ano.mes);
    const patientInfo = ` Relatório de pagamentos do mês de ${mes}`;
    doc.setFontSize(12);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    doc.text(patientInfo.split('\n'), eixox, eixoy, { maxWidth: maxWidth, lineHeight: lineHeight });

    // Cabeçalhos da tabela
    const tableColumn = ["Valor", "Tipo pagamento", "Paciente", "Profissioal", "Data"];

    // Inicializando as linhas da tabela
    const tableRows = [];
    let totalPagamento = 0;

    Object.keys(pagamento).forEach(dia => {
        pagamento[dia].forEach(pagamentos => {
            totalPagamento += pagamentos.pagamento;

            const row = [
                pagamentos.pagamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                pagamentos.tipo_pagamento,
                pagamentos.paciente,
                pagamentos.profissionalId,
                new Date(pagamentos.Data).toLocaleDateString(),  // Formata a data
            ];
            tableRows.push(row);
        });
    });
    const tableStartY = eixoy + (lineHeight * patientInfo.split('\n').length) + 0;

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

    const finalY = doc.lastAutoTable.finalY;
    // Texto informativo sobre o total de pagamentos, logo abaixo da tabela
    const informacoes = `Foram pagos um total de ${totalPagamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

    doc.setFontSize(13);
    doc.setTextColor(126, 126, 126); // Define a cor do texto
    doc.text(informacoes, 14, finalY + 10);

    addFooter(doc);

    const pdfBuffer = doc.output('arraybuffer');
    return pdfBuffer;
}
module.exports = { pdfPagamentos }