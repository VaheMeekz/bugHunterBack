var express = require("express");
var router = express.Router();
require("dotenv").config();
const InterestedController = require("../Controllers/interestsController");

router.post("/", InterestedController.createInterest);
router.post("/chage", InterestedController.changeStstus);
router.post("/myInterestedPrograms", InterestedController.myInterests);
router.post("/del", InterestedController.deleateInterest);
router.post("/prog", InterestedController.programs);

module.exports = router;
