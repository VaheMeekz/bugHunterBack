var express = require("express");
var router = express.Router();
require("dotenv").config();
const adminMiddleware = require("../middleware/adminMiddleware")
const ContactUsController = require("../Controllers/contactus");

router.get("/",adminMiddleware, ContactUsController.getAllContacts);
router.post("/", ContactUsController.createContactUs);
router.post("/sendAnswer", ContactUsController.sendAnswer);
router.post("/deleate", ContactUsController.deleateContact);

module.exports = router;
