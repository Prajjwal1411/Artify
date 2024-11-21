const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'artify@gmail.com', 
    pass: 'ABC123'
  }
});


const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Auction Platform" <artify@gmail.com>',
      to, 
      subject, 
      text,
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = 
{
    sendMail,
}
