var express = require("express");
var router = express.Router();
require("dotenv").config();
const adminMiddleware = require("../middleware/adminMiddleware")
const BlogController = require("../Controllers/blogController");

router.get("/",adminMiddleware, BlogController.getBlogs);
router.post("/", BlogController.createBlog);
router.post("/sendEmail", BlogController.sendEmail);

module.exports = router;
