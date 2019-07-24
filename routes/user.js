const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');
const User = require('../models/User');
const mongoose = require("mongoose");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

// RENDER SIGNUP PAGE
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// PROCESS SIGNUP REQUEST
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.render("signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  };

  User.findOne({'username': username})
    .then(user => {
      if (user !== null) {
        res.render("signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }  

      User.create({
          username: username,
          password: hashPass
        })
        .then(() => {
          res.redirect("/user/login");
        })
        .catch(error => {
          console.log(error);
        })
    })
});

// RENDER LOGIN PAGE
router.get("/login", (req, res, next) => {
  res.render("login");
});

// PROCESS LOGIN REQUEST
router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  // Check if both login fields are filled
  if (theUsername === "" || thePassword === "") {
    res.render("login", {
      errorMessage: "Please enter both, username and password to Login."
    });
    return;
  }
  // Ceck if username exists
  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      // Check if password Hash matches
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user; // not a proper _id in the database
        res.redirect("/");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});


module.exports = router;
