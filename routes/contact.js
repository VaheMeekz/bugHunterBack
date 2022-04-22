const express = require("express");
const router = express.Router();
require("dotenv").config();
const adminMiddleware = require("../middleware/adminMiddleware")
const contactController = require("../Controllers/contactController");

router.get("/",adminMiddleware, contactController.getAllContacts);
router.post("/", contactController.createContact);
router.post("/sendAnswer", contactController.sendAnswer);
router.post("/deleate", contactController.deleateContact);

module.exports = router;
