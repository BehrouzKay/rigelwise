const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Import the path module

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve the HTML form

// Serve contact.html when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/send-email', (req, res) => {
    const { name, company, country, email, subject, message } = req.body;

    // Configure the transporter (replace with your email service credentials)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'behrooz.09@gmail.com',
            pass: 'Mordad1399'
        }
    });

    let mailOptions = {
        from: 'behrooz.09@gmail.com',
        to: 'behrooz.09@gmail.com',
        subject: subject,
        text: `Name: ${name}\nCompany: ${company}\nCountry: ${country}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.toString() });
        }
        res.json({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
