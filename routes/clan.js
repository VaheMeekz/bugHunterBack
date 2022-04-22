var express = require("express");
var router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware")
const ClanController = require("../Controllers/clanController");


router.get("/",adminMiddleware,ClanController.getClans);
router.post("/", ClanController.createClan);
router.post("/deleate", ClanController.deleateClan);
router.post("/myClan", ClanController.myClan);
router.post("/members", ClanController.clanMembers);
router.post("/logoutClan", auth, ClanController.logoutClan);
router.post("/myClanScore", ClanController.clanScore);
router.post("/avatar", auth, ClanController.myClanAvatar);
router.post("/editAvatar", ClanController.editAvatar);
router.post("/myAvatar", auth, ClanController.clanAvatar);
router.post("/about", auth, ClanController.addAboutClan);
router.post("/about/my", auth, ClanController.aboutMyClan);
router.post("/delAvatar", auth, ClanController.deleateMyClanAvatar);
router.get("/paginationClans", ClanController.paginationClans);

module.exports = router;
