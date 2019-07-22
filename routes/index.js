const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
