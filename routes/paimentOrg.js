var express = require("express");
var router = express.Router();
require("dotenv").config();
const OrgPaiController = require("../Controllers/paymenOrgController");

router.post("/", OrgPaiController.createPaid);
router.post("/my", OrgPaiController.myPaiments);

module.exports = router;
