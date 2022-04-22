var express = require("express");
var router = express.Router();

const AdminMessages = require("../models").AdminMessages;

const adminMessagesController = require("../Controllers/adminMessagesContoller");

router.post("/", adminMessagesController.createMessage);
router.post("/thisUser", adminMessagesController.thisUserMessages);
router.post("/my", adminMessagesController.myMessages);
router.post("/del", adminMessagesController.deleteMessage);

module.exports = router;
