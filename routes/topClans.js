var express = require("express");
var router = express.Router();
require("dotenv").config();
const topClansController = require("../Controllers/topClanController");

router.get("/", topClansController.getTopClan);

module.exports = router;
