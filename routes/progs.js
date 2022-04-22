var express = require("express");
var router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const ProgramController = require("../Controllers/programController");

router.post("/",auth, ProgramController.createProgram);
router.get("/",auth, ProgramController.getPrograms);
router.post("/update",auth, ProgramController.updateProgram);
router.post("/myPrograms",auth, ProgramController.mtPrograms);
router.post("/createRetest", ProgramController.createRetest);
router.post("/del",auth, ProgramController.deleteProgram);
router.get("/tProg/:id",auth, ProgramController.thisOrganizationProgram);
router.post("/thispProg", ProgramController.thisProgram);

module.exports = router;
