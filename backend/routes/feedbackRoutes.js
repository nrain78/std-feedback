const express = require("express");
const { submitFeedback, getAllFeedbacks } = require("../controllers/feedbackController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitFeedback);
router.get("/", verifyToken, getAllFeedbacks);

module.exports = router;
