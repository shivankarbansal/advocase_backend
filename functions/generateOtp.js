const generateOtp = function(){
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    return otp;
}
module.exports = generateOtp;