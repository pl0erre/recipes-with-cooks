const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
  Recipe.find({})
  .populate("creator")
  .then((recipes)=> {
    res.render('recipes', {recipes});
  })
  .catch((err)=> {
    res.send("Error in recipes route");
    // res.redirect("/recipes");
  })
});

router.get('/create', (req, res) => {
  Cook.find({})
    .then((creator) => {
      res.render("create-recipe", {creator});
    })
    .catch((err) => {
      res.send("Error in create route")
    })
});

router.post('/create', (req, res, next) => {
  let newRecipe = {
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients.split(","),
    cuisine: req.body.cuisine,
    dishType: req.body.dishtype,
    image: req.body.image,
    duration: req.body.duration,
    creator: mongoose.Types.ObjectId(req.body.creator)
  };
  Recipe.create(newRecipe)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((err) => {
      res.send("Error in redirecting to recipes page")
    })
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
  .populate("creator")
  .then((recipe) => {
    res.render("single-recipe", {recipe});
  })
  .catch((err) => {
    res.send("Error in single-recipe route")
  })
});

router.get('/:id/delete', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id})
  .then(() => {
    res.redirect("/recipes");
  })
  .catch((err) => {
    res.send("Error in deletion route")
  })
});

router.get('/:id/update', (req, res) => {
  Recipe.findById(req.params.id)
    .populate("creator")
    .then((recipe) => {
      res.render("update-recipe", {recipe});
    })
    .catch((err) => {
      res.send("Error in update route")
    })
});

router.post("/:id/update", (req, res) =>{

})


module.exports = router;
