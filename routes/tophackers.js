var express = require("express");
var router = express.Router();
require("dotenv").config();
const topHackerController = require("../Controllers/topHackerController");

router.get("/", topHackerController.getTopHacker);

module.exports = router;
