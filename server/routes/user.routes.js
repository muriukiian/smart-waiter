const express = require("express");
const verifyToken = require("../middleware/user.middleware");
const router = express.Router();


router.get("/", verifyToken)


module.exports = router;