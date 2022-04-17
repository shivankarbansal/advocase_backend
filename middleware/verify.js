const crypto = require('crypto')

const verify = async (req,res,next)=>{
    try {
        const hash = req.body.hash;
        const key = "secretkey";
        const data = ""+req.body.otp;
        const hash2 = crypto.createHmac("sha256",key).update(data).digest("hex");
        if(hash !== hash2){
            throw new Error();
        }
    } catch (error) {
        res.status(401).send({error:'Please enter correct otp'})
    }
    next();
}
module.exports = verify;