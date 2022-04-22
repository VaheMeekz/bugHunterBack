var express = require("express");
var router = express.Router();
require("dotenv").config();
const adminMiddleware = require("../middleware/adminMiddleware")
const PartnerController = require("../Controllers/partnerController")

router.get("/",adminMiddleware, PartnerController.getPartners);
router.post("/",PartnerController.createPartner);
router.post("/sendAnswer",PartnerController.sendAnswer);
router.post("/deleate", PartnerController.delPartner);

module.exports = router;
