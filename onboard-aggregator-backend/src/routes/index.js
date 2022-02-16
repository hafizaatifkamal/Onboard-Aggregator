const express = require("express");
const router = express.Router();

const redmineRoutes = require("./redmine");

router.use("/redminers", redmineRoutes);

module.exports = router;