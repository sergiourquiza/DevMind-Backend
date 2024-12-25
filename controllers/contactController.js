const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developermind1x@gmail.com',
    pass: 'pbax tivl cqpm rmbq'
  },
});

exports.contact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }
  
    try {
      const mailOptions = {
        from: "developermind1x@gmail.com",
        to: email,
        subject: `Nuevo mensaje de ${name}: ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      console.log("Correo enviado correctamente.");
      res.status(200).json({ message: "Formulario enviado correctamente." });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).json({ error: "Error al enviar el formulario." });
    }
};