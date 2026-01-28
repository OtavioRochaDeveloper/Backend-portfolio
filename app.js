require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);


app.post('/send-email', async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  if(!nome || !email || !mensagem) {
    return res.status(400).json({ 
      success: false, 
      message: 'Por favor, preencha todos os campos obrigatórios.'
     });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'otaviorocha36@gmail.com',
      subject: `Novo contato via portfolio - ${nome}`,
      html: `
      <h2>📧 Novo Contato do Portfolio</h2>
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
      <div style="background-color: white; padding: 20px; border-radius: 8px;">
      <p><strong>👤 Nome:</strong> ${nome}</p>
      <p><strong>📧 Email:</strong> ${email}</p>
      <p><strong>📱 Telefone:</strong> ${telefone || 'Não informado'}</p>
      <hr style="border: 1px solid #00a8ff;">
      <p><strong>💬 Mensagem:</strong></p>
      <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00a8ff; border-radius: 4px;">
          ${mensagem}
          </p>
        </div>
      </div>
    `,
    });
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar email.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0' ,() => { // ✅ 
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📧 Email será enviado para: otaviorocha36@gmail.com`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
});