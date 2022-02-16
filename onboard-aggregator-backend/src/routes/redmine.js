const express = require("express");
const redmineRoutes = express.Router();

const {
    postRedminers,
    getRedminers,
    blockRedminers,
} = require("../controllers/redmine");

redmineRoutes.post("/", postRedminers);
redmineRoutes.get("/", getRedminers);
redmineRoutes.put("/:id", blockRedminers);

module.exports = redmineRoutes;