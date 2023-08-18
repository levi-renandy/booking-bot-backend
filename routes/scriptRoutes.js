const express = require("express");
const router = express.Router();

const { getScript } = require("../controller/script");

//GET /script/getScript
router.get("/getScript", getScript);

module.exports = router;
