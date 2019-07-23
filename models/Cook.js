const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema ({
  lastName: String,
  firstName: String,
  recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}]
})


const Cook = mongoose.model('Cook', cookSchema);

module.exports = Cook;
