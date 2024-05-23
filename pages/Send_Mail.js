const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/forgetpass', async (req, res) => {
  const { to, text } = req.body;


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'edineamara@gmail.com',
      pass: 'maom bivu jrtv eijq'
    }
  });


  let mailOptions = {
    from: 'edineamara@gmail.com',
    to: to,
    subject: 'Password Reset Code',   
    text: text 
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Code sent successfully' });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
