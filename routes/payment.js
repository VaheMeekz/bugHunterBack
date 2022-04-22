var express = require("express");
var router = express.Router();
require("dotenv").config();
const PaymentController = require("../Controllers/paymentsController");

router.post("/pay", PaymentController.createPayment);
router.post("/myPayments", PaymentController.myPayments);

module.exports = router;
