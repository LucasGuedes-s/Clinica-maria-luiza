const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Pode usar "hotmail", "yahoo", etc.
    auth: {
        user: 'clinicamarialuizaacarirn@gmail.com', // Substitua pelo seu e-mail
        pass: 'xbnm wdwf uzuh dtqm' // Use uma senha de aplicativo, não a senha real!
    }
});

async function enviarEmail() {
    try {
        const info = await transporter.sendMail({
            from: '"Clinica Maria Luiza" <lucasguedes2908@gmail.com>',
            to:  'joaopaulosv068@gmail.com',
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

module.exports = enviarEmail;
