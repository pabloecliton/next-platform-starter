import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Validar CAPTCHA
  const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`
  });

  const captchaData = await captchaResponse.json();
  if (!captchaData.success) {
    return res.status(400).json({ error: 'CAPTCHA inválido' });
  }

  // Configurar e-mail (usando SendGrid)
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // Enviar e-mail
  await transporter.sendMail({
    from: 'suporte@seudominio.com',
    to: 'seu-email@provedor.com',
    subject: `Novo Chamado: ${req.body.problema}`,
    text: `
      Nome: ${req.body.nome}
      E-mail: ${req.body.email}
      Tipo: ${req.body.problema}
      Descrição: ${req.body.descricao}
      Anexo: ${req.body.anexo || 'Nenhum'}
    `,
  });

  res.status(200).json({ success: true });
}