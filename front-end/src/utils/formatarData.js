export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
export const formatarMesAno = (data) => {
    const [ano, mes] = data.split('-'); // Divide o ano e o mês
    const dataObjeto = new Date(ano, mes - 1); // Cria uma nova data (meses começam em 0)
  
    // Formata para mostrar o nome do mês por extenso
    const nomeMes = dataObjeto.toLocaleString('pt-BR', { month: 'long' });
  
    return `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} de ${ano}`;
  }
  