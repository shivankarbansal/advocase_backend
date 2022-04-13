const express = require("express");
const caseController = require("./../controllers/caseController");

const router = express.Router();

router.route("/").get(caseController.getAllCases);

module.exports = router;
