const express = require("express");
const lawyerController = require("./../controllers/lawyerController");
const verify = require('../middleware/verify');
const auth = require('../middleware/auth');
const router = express.Router();
router.route("/signup/email/otp").post(lawyerController.otpSignupEmail);
router.route("/signup/phone/otp").post(lawyerController.otpSignupPhone);
router.route("/login/otp").post(lawyerController.otpLogin);
router.post("/signup",verify,lawyerController.Signup);
router.post("/login",verify,lawyerController.Login);
router.get("/me",auth,lawyerController.myProfile);
router.post("/logout",auth,lawyerController.Logout);
router.post("/update/phone/otp",auth,lawyerController.otpUpdatePhone);
router.post("/update/email/otp",auth,lawyerController.otpUpdateEmail);
router.patch("/update/phone",[auth,verify],lawyerController.updatePhone);
router.patch("/update/email",[auth,verify],lawyerController.updateEmail);
router.post("/delete/otp",auth,lawyerController.otpDelete);
router.delete("/delete",[auth,verify],lawyerController.Delete);
module.exports = router;