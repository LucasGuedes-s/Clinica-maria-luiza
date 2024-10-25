const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

// Função para formatar data e hora// Função para formatar data e hora
const formatarDataHoraSeparados = (dataCompleta) => {
    if (!dataCompleta) return { data: undefined, hora: undefined };

    // Cria um objeto Date a partir da string de data
    const data = new Date(dataCompleta);

    // Converte para o fuso horário de Brasília (UTC-3)
    const offsetBrasilia = -3 * 60; // UTC-3 em minutos
    const offsetServidor = data.getTimezoneOffset(); // Offset do servidor em minutos
    const dataBrasilia = new Date(data.getTime() + (offsetServidor * 60000) + (offsetBrasilia * 60000));

    // Formatação da data
    const dia = String(dataBrasilia.getUTCDate()).padStart(2, '0');
    const mes = String(dataBrasilia.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = dataBrasilia.getUTCFullYear();

    // Formatação da hora
    const horas = String(dataBrasilia.getUTCHours()).padStart(2, '0');
    const minutos = String(dataBrasilia.getUTCMinutes()).padStart(2, '0');

    return { data: `${dia}/${mes}/${ano}`, hora: `${horas}:${minutos}` };
};

module.exports = { formatarDataHoraSeparados, formatDate };
