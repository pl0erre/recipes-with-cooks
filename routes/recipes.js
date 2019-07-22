const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Cook = require('../models/Cook');

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
});


module.exports = router;





// router.get("/create", (req,res)=> {
//   Author.find({})
//       .then((authors)=> {
//           res.render("create-book", {authors});
//       })
//       .catch((err)=> {
//           next();
//       })
// })

// router.post("/create", (req,res)=> {
  
//   let newBook = {
//       title: req.body.title,
//       description: req.body.description,
//       rating: req.body.rating,
//       author: mongoose.Types.ObjectId(req.body.author),
//       image_url: req.body.image_url
//   };

//   Book.create(newBook)
//       .then((book)=> {
//           res.redirect(`/books/detail/${book._id}`)
//       })
// })
