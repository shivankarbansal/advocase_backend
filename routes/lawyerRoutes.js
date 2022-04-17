const express = require("express");
const lawyerController = require("./../controllers/lawyerController");
const verify = require('../middleware/verify')
const router = express.Router();
router.route("/signup/email/otp").post(lawyerController.otpSignupEmail);
router.route("/signup/phone/otp").post(lawyerController.otpSignupPhone);
router.route("/login/otp").post(lawyerController.otpLogin);
router.post("/signup",verify,lawyerController.Signup);
router.post("/login",verify,lawyerController.Login);
module.exports = router;