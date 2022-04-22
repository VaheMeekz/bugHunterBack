var express = require("express");
var router = express.Router();
require("dotenv").config();

const HightTargetController = require("../Controllers/hightTargrtController");

router.post("/create", HightTargetController.createHightTarget);
router.post("/myScope", HightTargetController.myScope);

module.exports = router;
