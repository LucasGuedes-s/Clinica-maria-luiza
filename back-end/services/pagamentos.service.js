const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function postPagamentos(pagamento){  
    console.log(pagamento)
    const pagamentos = await prisma.Pagamentos.create({
        data: {
            id: pagamento.pagar.id,
            pagamento: parseFloat(pagamento.pagar.valor),
            paciente: pagamento.pagar.paciente,
            profissionalId: pagamento.pagar.profissionalId,
            Data: new Date()
          },
    });
    console.log(pagamentos)
    return pagamentos;
}
async function getPagamentos(req, res){  
    try {
        // Buscar todos os pagamentos
        const pagamentos = await prisma.Pagamentos.findMany({});
    
        // Agrupar os pagamentos por mês
        const pagamentosPorMes = pagamentos.reduce((acc, pagamento) => {
          // Certifique-se de que a chave da data esteja correta
          const data = new Date(pagamento.Data); // Acessando a chave 'Data' corretamente
          if (!isNaN(data.getTime())) { // Verifica se a data é válida
            const mes = data.getMonth() + 1; // getMonth() retorna de 0 a 11, então somamos 1
            const ano = data.getFullYear();
            const chaveMesAno = `${ano}-${mes.toString().padStart(2, '0')}`;
    
            // Se não houver um array para este mês, crie um
            if (!acc[chaveMesAno]) {
              acc[chaveMesAno] = [];
            }
    
            // Adicionar o pagamento ao array do mês correspondente
            acc[chaveMesAno].push(pagamento);
          } else {
            console.error(`Data inválida no pagamento com ID ${pagamento.id}`);
          }
    
          return acc;
        }, {});
    
        // Retornar o resultado agrupado
        return pagamentosPorMes;
    
      } catch (error) {
        console.error(error);
        return error
    }
  }
module.exports = { postPagamentos, getPagamentos };