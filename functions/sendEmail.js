const sendEmail = function(mailOptions){
    const nodemailer = require('nodemailer');
    const dotenv = require("dotenv");
    dotenv.config({ path: "./config.env" });
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'Gmail',
        
        auth: {
            user: process.env.YOUR_EMAIL,
            pass: process.env.YOUR_PASSWORD
        }
    });
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
        res.render('otp');
    });
}
module.exports = sendEmail;