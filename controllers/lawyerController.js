const Lawyer = require('../models/lawyerModel');;
const sendEmail = require('../functions/sendEmail');
const sendSms = require('../functions/sendMessage');
const generateOtp = require('../functions/generateOtp');
const crypto = require('crypto');
const dotenv = require("dotenv");
const validator = require('validator');
dotenv.config({ path: "./config.env" });
const key = "secretkey"
exports.otpSignupEmail = async (req,res)=>{
    try {
        var email;

        var otp = generateOtp();

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
        
        sendEmail(mailOptions);

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
        var otp = generateOtp();
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
            var otp = generateOtp();
            var mailOptions={
                to: email,
                subject: "Otp for login is: ",
                html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
            };
            
            sendEmail(mailOptions);

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
            var otp = generateOtp();
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
exports.myProfile = async (req,res)=>{
    try {
        res.send(req.lawyer);
    } catch (error) {
        res.status(400).send();
    }
}
exports.Logout = async (req,res)=>{
    try {
        req.lawyer.tokens = req.lawyer.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.lawyer.save();
        res.status(201).send();
    } catch (error) {
        res.status(500).send()
    }
}
exports.otpUpdatePhone = async (req,res)=>{
    try {
        var otp = generateOtp();
        var mailOptions={
            to: req.lawyer.email,
            subject: "Phone number change",
            html: "<h3>OTP for phone number update is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
        };
        sendEmail(mailOptions);
        var data = ""+otp;
        const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
        res.status(201).send({hash:hash});
    } catch (error) {
        res.status(400).send();
    }
}
exports.otpUpdateEmail = async (req,res)=>{
    try {
        var otp = generateOtp();
        const message = "OTP for email account change is " + otp;
        sendSms("+91"+req.lawyer.phoneNumber, message);
        var data = ""+otp;
        const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
        res.status(201).send({hash:hash});
    } catch (error) {
        res.status(400).send();
    }
}
exports.updatePhone = async (req,res)=>{
    try {
        if(!validator.isMobilePhone(req.body.phoneNumber)){
            throw new Error("Enter a valid mobile number");
        }
        req.lawyer.phoneNumber = req.body.phoneNumber;
        await req.lawyer.save();
        res.send(req.lawyer);
    } catch (error) {
        res.send(error.message);
    }
}
exports.updateEmail = async (req,res)=>{
    try {
        if(!validator.isEmail(req.body.email)){
            throw new Error("Enter a valid email address");
        }
        req.lawyer.email = req.body.email;
        await req.lawyer.save();
        res.send(req.lawyer);
    } catch (error) {
        res.send(error.message);
    }
}
exports.otpDelete = async (req,res)=>{
    var otp = generateOtp();
    var mailOptions={
        to: req.lawyer.email,
        subject: "Delete Account",
        html: "<h3>OTP to delete your account is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
    };
    sendEmail(mailOptions);
    var data = ""+otp;
    const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
    res.status(201).send({hash:hash});
}
exports.Delete = async (req,res)=>{
    try {
        await req.lawyer.remove()
        res.send(req.lawyer)
    } catch (error) {
        res.status(500).send()
    }
}