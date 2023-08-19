const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controller/email");

// POST /email/sendEmail
router.post("/sendEmail", sendEmail);

module.exports = router;
