const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');
const mongoose = require("mongoose");


router.get("/login", (req, res, next) => {
  res.render("login");
});

module.exports = router;