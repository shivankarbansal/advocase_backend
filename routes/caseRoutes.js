const express = require("express");
const caseController = require("./../controllers/caseController");
const auth = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, caseController.getAllCases)
  .post(auth, caseController.createCase);
router.route("/notes").patch(caseController.updateNotes);
router
  .route("/:id")
  .get(auth, caseController.getCaseById)
  .patch(auth, caseController.updateCase)
  .delete(auth, caseController.deleteCase);
router
  .route("/notes/:id")
  .get(caseController.getAllNotes)
  .patch(caseController.addNotes);
module.exports = router;
