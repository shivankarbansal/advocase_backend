const sendSms = (phone, message) => {
    const dotenv = require("dotenv");
    dotenv.config({ path: "./config.env" });
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
    }).then(message => console.log(message.sid));
}
module.exports = sendSms;