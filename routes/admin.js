var express = require("express");
var router = express.Router();


const adminController = require("../Controllers/adminController");

router.post("/create", adminController.createAdmin);
router.post("/login",adminController.loginAdmin);

module.exports = router;

