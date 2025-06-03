const express = require("express");
const userController = require("../controllers/profileController");
const router = express.Router();

router.get("/:id", userController.getProfileById);

module.exports = router;
