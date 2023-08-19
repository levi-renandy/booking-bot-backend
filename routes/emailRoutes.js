const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controller/email");

// GET /email/sendEmail
router.get("/sendEmail", sendEmail);

module.exports = router;
