const nodemailer = require('nodemailer');
const { format } = require("date-fns");
const dateFnsTz = require("date-fns-tz");
const { ptBR } = require("date-fns/locale");


const utcToZonedTime = dateFnsTz.utcToZonedTime; // Extraindo a função corretamente

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
      from: '"Clinica Maria Luiza" <lucasguedes2908@gmail.com>',
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

    console.log(dataFormatada)
    //console.log(destinatario, agendamento)
    const info = await transporter.sendMail({
      from: '"Clinica Maria Luiza"',
      to: destinatario,
      subject: 'Lembrete de Agendamento',
      html: `
            <p>Olá, <strong>${agendamento.profissional}</strong>! 😊</p>
            <p>Este é um lembrete do seu agendamento de consulta na clínica Maria Luiza.</p>
            <p><strong>📅 Data e hora:</strong> ${dataFormatada} </p>
            <p>Se precisar remarcar, entre em contato conosco.</p>
            <p>Tenha um ótimo dia!<br>Atenciosamente, <br><strong>Equipe da Clínica Maria Luiza</strong> 🏥</p>
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
          `
    });

    console.log('E-mails enviados com sucesso');
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
  }
}

module.exports = { enviarEmail, enviarNotificacaoAgendamento };
