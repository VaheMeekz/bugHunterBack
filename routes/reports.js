var express = require("express");
var router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const reportController = require("../Controllers/reportController")


router.post("/create",reportController.createReport);
router.post("/update", reportController.updateReport);
router.post("/deleate", reportController.deleteReport);
router.get("/allReports", reportController.getReport);
//lichni kabinetic poxelu hamar organizatciayi koxmic
router.post("/updateStatus",reportController.updateStatus);
router.post("/myReports", reportController.myReports);
router.post("/like",auth, reportController.likeReports);
router.post("/unlike",auth, reportController.unlikeReports);
router.post("/deleteMyProg",auth, reportController.deleateMyReport);

module.exports = router;
