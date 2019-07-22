const mongoose = require('mongoose');
const Recipe = require('../models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('../data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipes-with-cooks', {useNewUrlParser: true}) 
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.insertMany(data);
  })
  .then (() => {
    console.log('Custom recipe added')
    return Recipe.create({
      title: "Tomate Sauce",
      level: "Amateur Chef",
      ingredients: ['1/2 onion', '1 garlic clove', '2 tablespoons olive oil', 'A dash of red wine', '5 tasty tomatoes', '1 can of chopped tomatoes', 'Herbs', 'salt', 'black pepper', 'paprika powder'],
      cuisine: "Italian",
      dishType: "Other",
      image: 'https://static01.nyt.com/images/2015/08/26/dining/26KITCHEN1/26KITCHEN1-articleLarge.jpg',
      duration: 120,
      creator: "My Mom <3",
    })
  })
  .then(() => {
    console.log('Recipe created')
  })
  .then(() => {
    console.log('Connection to DB closed')
    return mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });