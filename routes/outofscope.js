var express = require("express");
var router = express.Router();
require("dotenv").config();

const OutofscopeController = require("../Controllers/outofscopeController");

router.post("/create", OutofscopeController.createTarget);
router.post("/myScope", OutofscopeController.myScope);

module.exports = router;
