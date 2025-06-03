const express = require("express");
const router = express.Router();
const candidatehistoryController = require("../controllers/candidatehistoryController");

router.post("/", candidatehistoryController.createCandidatehistory);
router.get("/", candidatehistoryController.getAllCandidateshistory);
router.get("/:id", candidatehistoryController.getCandidatehistoryById);
router.put("/:id", candidatehistoryController.updateCandidatehistory);
router.delete("/:id", candidatehistoryController.deleteCandidatehistory);
router.get("/candidatewise/:id", candidatehistoryController.getCandidateshistoryByCandidate);

module.exports = router;