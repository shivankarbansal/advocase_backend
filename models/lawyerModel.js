const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const lawyerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    lawyerID:{
        type:String,
        unique:true,
        required:true
    },
    phoneNumber:{
        type: String,
        unique: true,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
lawyerSchema.virtual('cases',{
    ref:'Case',
    localField:'_id',
    foreignField:'owner'
})
lawyerSchema.methods.generateAuthToken = async function (){
    const lawyer = this;
    const token = jwt.sign({_id:lawyer._id.toString()},"advocasestuff");
    lawyer.tokens = lawyer.tokens.concat({token});
    await lawyer.save();
    return token;
}
const Lawyer = mongoose.model("Lawyer",lawyerSchema);
module.exports = Lawyer;