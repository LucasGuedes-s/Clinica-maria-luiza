const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  service: 'gmail', // Pode usar "hotmail", "yahoo", etc.
  auth: {
    user: 'clinicamarialuizaacarirn@gmail.com', // Substitua pelo seu e-mail
    pass: 'xbnm wdwf uzuh dtqm' // Use uma senha de aplicativo, não a senha real!
  }
});

async function enviarEmail(destinatario) {
  try {
    const info = await transporter.sendMail({
      from: '"Clinica Maria Luiza"',
      to: destinatario,
      subject: 'Alterar Senha',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50; text-align: center;">Redefinição de Senha</h2>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta. Se você fez essa solicitação, clique no botão abaixo para criar uma nova senha:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://clinicamarialuizaacari.com.br/alterarsenha" 
             style="background-color: #007bff; color: #ffffff; padding: 12px 18px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
            Redefinir Senha
          </a>
        </div>
        <p>Se você não solicitou essa alteração, pode ignorar este e-mail. Sua senha atual permanecerá a mesma.</p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p><strong>Por segurança, lembre-se de:</strong></p>
        <ul>
          <li>✅ Escolher uma senha forte e única.</li>
          <li>✅ Não compartilhar sua senha com ninguém.</li>
          <li>✅ Atualizar suas credenciais regularmente.</li>
        </ul>
        <p>Se precisar de ajuda, entre em contato com nosso suporte.</p>
        <p style="text-align: center; font-weight: bold; color: #555;">Clínica Maria Luiza</p>
      </div>
    `
    });
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

async function enviarNotificacaoAgendamento(destinatario, agendamento) {
  try {
    //const dataFormatada = formatarDataHora(agendamento.data);

    const dataUTC = agendamento.data;

    // Extraindo cada componente da data no formato UTC
    const ano = dataUTC.getUTCFullYear();
    const mes = String(dataUTC.getUTCMonth() + 1).padStart(2, '0'); // Meses começam do 0 em JavaScript
    const dia = String(dataUTC.getUTCDate()).padStart(2, '0');
    const hora = String(dataUTC.getUTCHours()).padStart(2, '0');
    const minuto = String(dataUTC.getUTCMinutes()).padStart(2, '0');
    const segundo = String(dataUTC.getUTCSeconds()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

    const info = await transporter.sendMail({
      from: '"Clinica Maria Luiza"',
      to: destinatario,
      subject: 'Lembrete de Agendamento',
      html: `
            <p>Olá, <strong>${agendamento.profissional}</strong>! 😊</p>
            <p>Este é um lembrete do seu agendamento de consulta na clínica Maria Luiza.</p>
            <p><strong>📅 Data e hora:</strong> ${dataFormatada}h</p>
            <p>Se precisar remarcar, entre em contato conosco.</p>
            <p>Tenha um ótimo dia!<br>Atenciosamente, <br><strong>Equipe da Clínica Maria Luiza</strong> 🏥</p>
            <p>
              <a href="https://wa.me/5584991611038?text=Olá!%20Gostaria%20de%20remarcar%20meu%20agendamento." target="_blank">
                  <button style="background-color: #84E7FF; color: black; border: none; padding: 8px 16px; font-size: 12px; border-radius: 5px;">
                      Remarcar via WhatsApp
                  </button>
              </a>
            </p>
          `
    });

    await transporter.sendMail({
      from: '"Clinica Maria Luiza"',
      to: agendamento.email,
      subject: 'Lembrete de Agendamento',
      html: `
            <p>Olá, <strong>${agendamento.nome}</strong>! 😊</p>
            <p>Este é um lembrete do seu agendamento na Clínica Maria Luiza.</p>
            <p><strong>📅 Data e hora:</strong> ${dataFormatada}</p>
            <p><strong>👨‍⚕️ Profissional:</strong> ${agendamento.profissional}</p>
            <p>Se precisar remarcar ou cancelar, entre em contato conosco.</p>
            <p>Tenha um ótimo dia!<br>Atenciosamente, <br><strong>Equipe da Clínica Maria Luiza</strong> 🏥</p>
            <p>
              <a href="https://wa.me/5584991611038?text=Olá!%20Gostaria%20de%20remarcar%20meu%20agendamento." target="_blank">
                  <button style="background-color: #84E7FF; color: black; border: none; padding: 8px 16px; font-size: 12px; border-radius: 5px;">
                      Remarcar via WhatsApp
                  </button>
              </a>
          </p>
          `
    });

    console.log('E-mails enviados com sucesso');
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
  }
}
async function enviarEmailsAgendamentos() {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const fimDoDia = new Date(hoje);
    fimDoDia.setHours(23, 59, 59, 999);

    const hojeUTC = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0));
    const fimDoDiaUTC = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59, 999));

    // Buscar todos os agendamentos do dia
    const agendamentosDoDia = await prisma.agendamentos.findMany({
      where: {
        data: {
          gte: hojeUTC,
          lt: fimDoDiaUTC,
        },
        status: "Andamento",  // Garantir que o status seja "Andamento"
      },
      include: {
        profissional: {
          select: {
            nome: true,
            telefone: true,
            email: true,
          },
        },
        paciente: {
          select: {
            nome: true,
            telefone: true,
          },
        },
      },
    });

    // Agrupar agendamentos por profissional
    const agendamentosPorProfissional = {};
    for (const agendamento of agendamentosDoDia) {
      const emailProfissional = agendamento.profissional.email;

      if (!agendamentosPorProfissional[emailProfissional]) {
        agendamentosPorProfissional[emailProfissional] = {
          nome: agendamento.profissional.nome,
          email: emailProfissional,
          telefone: agendamento.profissional.telefone,
          agendamentos: [],
        };
      }

      // Formatar data e hora do agendamento

      const dataUTC = new Date(agendamento.data); // Certifique-se de que 'agendamento.data' está em UTC no banco

      // Extraindo data e hora de forma manual para evitar conversões de fuso horário
      const ano = dataUTC.getUTCFullYear();
      const mes = String(dataUTC.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
      const dia = String(dataUTC.getUTCDate()).padStart(2, '0');
      const hora = String(dataUTC.getUTCHours()).padStart(2, '0');
      const minuto = String(dataUTC.getUTCMinutes()).padStart(2, '0');
      const segundo = String(dataUTC.getUTCSeconds()).padStart(2, '0');

      const dataFormatada = `${dia}/${mes}/${ano}`;
      const horaFormatada = `${hora}:${minuto}:${segundo}`;

      // Adicionar o agendamento formatado à lista do profissional
      agendamentosPorProfissional[emailProfissional].agendamentos.push({
        data: dataFormatada,
        hora: horaFormatada,
        pacienteNome: agendamento.paciente?.nome || "Paciente não informado",
        pacienteTelefone: agendamento.paciente?.telefone || "Telefone não disponível",
        observacoes: agendamento.observacoes || 'Sem observações'
      });
    }

    for (const emailProfissional in agendamentosPorProfissional) {
      const { nome, email, telefone, agendamentos } = agendamentosPorProfissional[emailProfissional];

      let tabelaAgendamentos = `
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Data e Hora</th>
                    <th>Paciente</th>
                    <th>Observações</th>
                </tr>
        `;

      agendamentos.forEach(agendamento => {
        tabelaAgendamentos += `
                <tr>
                    <td>${agendamento.data} às ${agendamento.hora}</td>
                    <td>${agendamento.pacienteNome}</td>
                    <td>${agendamento.observacoes}</td>
                </tr>
            `;
      });

      tabelaAgendamentos += `</table>`;

      const mailOptions = {
        from: '"Clinica Maria Luiza"',
        to: emailProfissional,
        subject: "Lembrete de Agendamentos de Hoje",
        html: `
                <p>Olá, <strong>${nome}</strong>! 😊</p>
                <p>Bom dia! Aqui estão seus agendamentos de hoje:</p>
                ${tabelaAgendamentos}
                <p>Este é um e-mail automático, por favor não responder!</p>
                <p>Se precisar remarcar, entre em contato conosco.</p>
                <p>Tenha um ótimo dia!<br>Atenciosamente, <br><strong>Equipe da Clínica Maria Luiza</strong> 🏥</p>
              <p>
              <a href="https://wa.me/5584991611038?text=Olá!%20Gostaria%20de%20remarcar%20meu%20agendamento." target="_blank">
                  <button style="background-color: #84E7FF; color: black; border: none; padding: 8px 16px; font-size: 12px; border-radius: 5px;">
                      Remarcar via WhatsApp
                  </button>
              </a>
          </p>
            `
      };

      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error("Erro ao enviar e-mails para o agendamento de hoje:", error);
  }

}

async function enviarEmailsTodosAgendamentos() {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const fimDoDia = new Date(hoje);
    fimDoDia.setHours(23, 59, 59, 999);

    const hojeUTC = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0));
    const fimDoDiaUTC = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59, 999));

    // Buscar todos os agendamentos do dia
    const agendamentosDoDia = await prisma.agendamentos.findMany({
      where: {
        data: {
          gte: hojeUTC,
          lt: fimDoDiaUTC,
        },
        status: "Andamento",  // Garantir que o status seja "Andamento"
      },
      include: {
        profissional: {
          select: {
            nome: true,
            telefone: true,
            email: true,
          },
        },
        paciente: {
          select: {
            nome: true,
            telefone: true,
          },
        },
      },
    });

    // Agregar todos os agendamentos em uma lista única
    let tabelaAgendamentos = `
      <table border="1" cellpadding="5" cellspacing="0">
          <tr>
              <th>Data e Hora</th>
              <th>Paciente</th>
              <th>Profissional</th>
              <th>Observações</th>
          </tr>
    `;

    // Formatar os agendamentos para incluir na tabela
    agendamentosDoDia.forEach(agendamento => {
      const dataUTC = new Date(agendamento.data); // Certifique-se de que 'agendamento.data' está em UTC no banco

      // Extraindo data e hora de forma manual para evitar conversões de fuso horário
      const ano = dataUTC.getUTCFullYear();
      const mes = String(dataUTC.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
      const dia = String(dataUTC.getUTCDate()).padStart(2, '0');
      const hora = String(dataUTC.getUTCHours()).padStart(2, '0');
      const minuto = String(dataUTC.getUTCMinutes()).padStart(2, '0');
      const segundo = String(dataUTC.getUTCSeconds()).padStart(2, '0');

      const dataFormatada = `${dia}/${mes}/${ano}`;
      const horaFormatada = `${hora}:${minuto}:${segundo}`;

      tabelaAgendamentos += `
        <tr>
            <td>${dataFormatada} às ${horaFormatada}</td>
            <td>${agendamento.paciente?.nome || "Paciente não informado"}</td>
            <td>${agendamento.profissional?.nome || "Profissional não informado"}</td>
            <td>${agendamento.observacoes || 'Sem observações'}</td>
        </tr>
      `;
    });

    tabelaAgendamentos += `</table>`;

    // Enviar e-mail para os profissionais especificados
    const emailsDestinatarios = [
      "lucasguedes2908@gmail.com",
      "mikarla.vivian@gmail.com",
      "francimarakarla@hotmail.com",
    ];

    for (const emailDestinatario of emailsDestinatarios) {
      const mailOptions = {
        from: '"Clinica Maria Luiza"',
        to: emailDestinatario,
        subject: "Lembrete de Agendamentos de Hoje",
        html: `
            <p>Olá, <strong>Profissional</strong>! 😊</p>
            <p>Bom dia! Aqui estão todos os agendamentos da clínica para hoje:</p>
            ${tabelaAgendamentos}
            <p>Este é um e-mail automático, por favor não responder!</p>
            <p>Tenha um ótimo dia!<br>Atenciosamente, <br><strong>Equipe da Clínica Maria Luiza</strong> 🏥</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    console.log("E-mails enviados com sucesso para os profissionais!");
  } catch (error) {
    console.error("Erro ao enviar e-mails para os agendamentos de hoje:", error);
  }
}

module.exports = { enviarEmail, enviarNotificacaoAgendamento, enviarEmailsAgendamentos, enviarEmailsTodosAgendamentos };
