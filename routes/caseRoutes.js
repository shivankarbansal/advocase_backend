const express = require("express");
const caseController = require("./../controllers/caseController");
const auth = require('../middleware/auth')
const router = express.Router();

router
  .route("/")
  .get(caseController.getAllCases)
  .post(auth,caseController.createCase);
router.route("/notes").patch(caseController.updateNotes);
router
  .route("/:id")
  .get(caseController.getCaseById)
  .patch(caseController.updateCase)
  .delete(caseController.deleteCase);
router
  .route("/notes/:id")
  .get(caseController.getAllNotes)
  .patch(caseController.addNotes);
module.exports = router;
