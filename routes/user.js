const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');
const mongoose = require("mongoose");


router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});


module.exports = router;
