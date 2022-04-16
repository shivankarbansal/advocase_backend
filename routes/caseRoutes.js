const express = require("express");
const caseController = require("./../controllers/caseController");

const router = express.Router();

router
  .route("/")
  .get(caseController.getAllCases)
  .post(caseController.createCase);
router
  .route("/:id")
  .get(caseController.getCaseById)
  .patch(caseController.updateCase)
  .delete(caseController.deleteCase);
module.exports = router;
