const jwt = require('jsonwebtoken')
const Lawyer = require('../models/lawyerModel')
const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'advocasestuff')
        const lawyer = await Lawyer.findOne({id:decoded._id,'tokens.token':token})
        if(!lawyer){
            throw new Error()
        }
        req.token = token
        req.lawyer = lawyer
    } catch (error) {
        res.status(401).send({error:'Please authenticate'})
    }
    next()
}
module.exports = auth