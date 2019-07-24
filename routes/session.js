const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');
const User = require('../models/User');
const mongoose = require("mongoose");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("login", {
      errorMessage: "Login to access your profile"
    })
  }
});                        

router.get("/secret", (req, res, next) => {
  res.render("secret");
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.render("login", {
      successMessage: "Successfully logged out!"
    })
  });
});


module.exports = router;