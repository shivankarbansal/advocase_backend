const Lawyer = require('../models/lawyerModel');;
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require("dotenv");
const validator = require('validator');
dotenv.config({ path: "./config.env" });
const key = "secretkey"
exports.otpSignupEmail = async (req,res)=>{
    try {
        var email;

        var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);

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
        email=req.body.email;
        let lawyer = await Lawyer.findOne({email:req.body.email});
        if(lawyer!=null){
            console.log(lawyer);
            throw new Error("Email already exists")
        }
        if(!validator.isEmail(email)){
            throw new Error('Email is invalid');
        }
        
        var mailOptions={
            to: req.body.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            res.render('otp');
        });

        var data = ""+otp;
        const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
        res.status(201).send({hash:hash});
    } catch (error) {
        res.send(error.message)
    }
}
exports.otpSignupPhone = async (req,res)=>{
    try {
        let lawyer = await Lawyer.findOne({phoneNumber:req.body.phoneNumber});
        if(lawyer!=null){
            throw new Error("Phone Number already in use");
        }
        if(!validator.isMobilePhone(req.body.phoneNumber)){
            throw new Error("Enter a valid Mobile Number");
        }
        var phoneNumber = "+91" + req.body.phoneNumber;
        var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const sendSms = (phone, message) => {
        const client = require('twilio')(accountSid, authToken);
        client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
            }).then(message => console.log(message.sid));
        }
        
        const message = "OTP for account verification is " + otp;
        console.log(phoneNumber);
        sendSms(phoneNumber, message);
        var data = ""+otp;
        const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
        res.status(201).send({hash:hash})
    } catch (error) {
        res.send(error.message);
    }
}
exports.otpLogin = async (req,res)=>{
    try {
        var input;
        input=req.body.input;
        if(validator.isEmail(input)){
            var email = input;
            const lawyer = await Lawyer.findOne({email});
            if(lawyer === null){
                throw new Error("User not found");
            }
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);

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
            
            var mailOptions={
                to: email,
                subject: "Otp for login is: ",
                html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);   
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                res.render('otp');
            });

            var data = ""+otp;
            const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
            res.status(201).send({hash:hash});
        }
        else if(validator.isMobilePhone(input)){
            var phoneNumber;
            const lawyer = await Lawyer.findOne({phoneNumber:input});
            if(lawyer === null){
                throw new Error("User not found");
            }
            phoneNumber = "+91"+input;
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);
            console.log(otp);
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

            const sendSms = (phone, message) => {
            const client = require('twilio')(accountSid, authToken);
            client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
                }).then(message => console.log(message.sid));
            }
            
            const message = "OTP for account verification is " + otp;
            sendSms(phoneNumber, message);
            var data = ""+otp;
            const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
            res.status(201).send({hash:hash});
        }
        else{
            throw new Error("Enter valid email/phone");
        }
        
    } catch (error) {
        res.send(error.message);
    }
}
exports.Signup = async (req,res)=>{
    delete req.body.hash;
    delete req.body.otp;
    const lawyer = new Lawyer(req.body);
    try {
        await lawyer.save();
        const token = await lawyer.generateAuthToken();
        res.status(201).send({lawyer,token});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.Login = async (req,res)=>{
    try {
        var lawyer;
        if(validator.isEmail(req.body.input)){
            lawyer = await Lawyer.findOne({email:req.body.input});
        }
        else{
            lawyer = await Lawyer.findOne({phoneNumber:req.body.input})
        }
        const token = await lawyer.generateAuthToken();
        res.send({lawyer,token});
    } catch (error) {
        res.status(400).send();
    }
}
