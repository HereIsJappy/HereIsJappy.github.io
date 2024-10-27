const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario

// Middleware para analizar el cuerpo de las solicitudes en JSON
app.use(bodyParser.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utiliza tu proveedor de correo, como Gmail, Outlook, etc.
    auth: {
        user: 'terra.com.empresa@gmail.com', // Cambia a tu correo
        pass: 'Juan31122007_'       // Cambia a tu contraseña o token de app (si Gmail)
    }
});

// Ruta para manejar el envío del formulario
app.post('/enviar-correo', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configuración del correo electrónico
    const mailOptions = {
        from: email,
        to: 'terra.com.empresa@gmail.com', // Cambia al correo donde quieres recibir el formulario
        subject: `Nuevo mensaje de contacto: ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo.');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado exitosamente.');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
