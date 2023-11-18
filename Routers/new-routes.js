const express = require("express");
const router = express.Router();
const newController = require("../Controllers/new");

router.get("/getAllNews", newController.showNew);

module.exports = router;
