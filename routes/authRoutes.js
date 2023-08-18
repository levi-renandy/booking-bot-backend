const express = require("express");
const router = express.Router();

const { request, register } = require("../controller/auth");

// POST /auth/request
router.post("/request", request);

// POST /auth/register
router.post("/register", register);

module.exports = router;
