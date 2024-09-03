const { jsPDF } = require("jspdf");
const autoTable = require('jspdf-autotable');
const fs = require('fs');
const path = require('path');
const paciente = require('../pacientes.service')
const profissionais = require('../profissionais.service')
const formatar = require('../../utils/formatdata.ultil')
const ChartJSNodeCanvas = require('chartjs-node-canvas');
const { getImageAsBase64 } = require('../../utils/img.ultil');

async function generateChart(aplicacoes) {
    // Mapeia os valores das aplicações para um formato numérico ou categórico
    const labels = ['Aplicação 1', 'Aplicação 2', 'Aplicação 3', 'Aplicação 4', 'Aplicação 5', 'Teste'];
    const desempenhoData = labels.map(label => {
      switch (aplicacoes[label]) {
        case 'AT+':
          return 5;
        case 'AT-':
          return 3;
        case 'AP+':
          return 4;
        case 'SA+':
          return 2;
        default:
          return 1;
      }
    });
  
    const configuration = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Desempenho',
          data: desempenhoData, // Dados dinâmicos baseados nas aplicações
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  
    // Renderiza o gráfico para um buffer de imagem
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  
    return imageBuffer;
  }
  
function addFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    const data_hora = formatar.formatarDataHoraSeparados(new Date())
    for (let i = 0; i <= pageCount; i++) {
        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i); // Vai para a página específica
            doc.setFontSize(10);
            doc.setTextColor(126, 126, 126);
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
    console.log(consultas)

    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');
    const imgHeight = 40;
    const imgWidth = 40;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    const firstImageY = 10 + imgHeight + 10;

    // Definir as dimensões da segunda imagem
    const secondImageWidth = 40;
    const secondImageHeight = 40;

    // Posicionar a segunda imagem e o texto abaixo da primeira imagem
    const secondImageX = 15; // Posição X da segunda imagem
    const secondImageY = firstImageY + 5; // Posição Y abaixo da primeira imagem

    const textX = secondImageX + secondImageWidth + 10; // Texto ao lado direito da segunda imagem
    const textY = secondImageY + 5;

    const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))
    //Foi atendido na Clínica Maria Luíza. A seguir, são detalhados os dados de todas as consultas realizada sob esse paciente na clínica.   

    const patientInfo = `
    Nome: ${consultas.nome};
CPF: ${consultas.cpf};
E-mail: ${consultas.email}
Residente em: ${consultas.endereco}
Nascido em ${data_hora.data};
    `;
    doc.setFontSize(14);
    doc.setTextColor(126, 126, 126); // Define a cor do texto como preta
    const lineHeightFactor = 1.5;

    doc.text(patientInfo.trim(), textX, textY, { maxWidth: 130, lineHeightFactor: lineHeightFactor });

    const inicio = new Date().getTime();
    const image = await getImageAsBase64(consultas.foto);

    doc.addImage(image, 'JPEG', secondImageX, secondImageY, secondImageWidth, secondImageHeight);
    var fim = new Date().getTime();

    // Cabeçalhos da tabela
    const tableColumn = ["Consulta", "Data", "Descrição", "Profissional"];

    // Inicializando as linhas da tabela
    const tableRows = [];
    const laudos = []
    consultas.consultas.forEach(consulta => {
        if (consulta.laudos.length > 0) {  // Verifica se o array de laudos não está vazio
            laudos.push(...consulta.laudos);  // Adiciona os laudos ao array principal, desestruturando o array interno
        }
        const row = [
            consulta.consulta,
            new Date(consulta.data).toLocaleDateString(),  // Formata a data
            consulta.descricao,
            consulta.profissionalId,
        ];
        tableRows.push(row);
    });

    const lineHeight = 10; // Altura da linha
    const tableStartY = textY + (lineHeight * patientInfo.split('\n').length); // Ajuste conforme necessário

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
    doc.addPage();

    // Adicionar o título para a nova página
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Preto
    doc.text('Laudos do Paciente', 10, 20);

    for (let i = 0; i < laudos.length; i++) {
        const laudoUrl = laudos[i];
        try {
            if (i > 0) {
                doc.addPage();
                addFooter(doc);     // Adiciona uma nova página para cada laudo, exceto o primeiro
            }
            const laudoBase64 = await getImageAsBase64(laudoUrl);
            const laudoWidth = pageWidth - 20; // Ajuste de acordo com o tamanho da página
            const laudoHeight = (laudoWidth * 0.75); // Mantém a proporção da imagem
            const laudoX = 10;
            const laudoY = 20;

            // Adicionar o laudo na nova página
            doc.addImage(laudoBase64, 'JPEG', laudoX, laudoY, laudoWidth, laudoHeight);

        } catch (error) {
            console.error('Erro ao adicionar imagem do laudo:', error);
        }
    }
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
    doc.text(consulta.trim(), texto)
    addFooter(doc);
    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
async function pdfConsultas(id) {
    const doc = new jsPDF();
    const consultas = await profissionais.getConsultas(id)
    const imgPath = path.resolve(__dirname, '../../src/assets/img.girafas.png');
    const imgData = fs.readFileSync(imgPath).toString('base64');
    const imgHeight = 40;
    const imgWidth = 40;

    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - imgWidth) / 2;
    doc.addImage(imgData, 'PNG', x, 10, imgWidth, imgHeight);

    //const data_hora = formatar.formatarDataHoraSeparados(new Date(consultas.data_nascimento))
    /*
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
    doc.text(consulta.trim(), texto) */
    addFooter(doc);
    const pdfBuffer = doc.output('arraybuffer');

    return pdfBuffer;
}
async function pdfConsultasAba(req) {
    const doc = new jsPDF();
    const consultas = await paciente.getConsultasAba(req);
    
    // Verifica se há consultas
    if (consultas.length > 0) {
        for (const consulta of consultas) {
            const aplicacoes = {
                'Aplicação 1': consulta.Aplicacao1,
                'Aplicação 2': consulta.Aplicacao2,
                'Aplicação 3': consulta.Aplicacao3,
                'Aplicação 4': consulta.Aplicacao4,
                'Aplicação 5': consulta.Aplicacao5,
                'Teste': consulta.teste
            };
            
            const chartImage = await generateChart(aplicacoes);
            const chartImageBase64 = chartImage.toString('base64');
            
            doc.addPage(); // Adiciona uma nova página para cada consulta
            doc.text(`Relatório de Desempenho - Consulta: ${consulta.data}`, 10, 10);
            doc.addImage(chartImageBase64, 'PNG', 10, 20, 180, 100);
        }
    }

    addFooter(doc);
    
    // Salva o PDF
    const pdfBuffer = doc.output('arraybuffer');
    return pdfBuffer;
}

module.exports = { generateChart, createReportPdf, pdfConsulta, pdfConsultas, pdfConsultasAba, addFooter }