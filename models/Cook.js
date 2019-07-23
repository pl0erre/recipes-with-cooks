const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema ({
  lastName: {
    type: String,
    required: [true, "Give your Cook a title!!!"]
    }, 
  firstName: {
    type: String,
    required: [true, "Give your Cook a title!!!"]
    }, 
  recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}]
})


const Cook = mongoose.model('Cook', cookSchema);

module.exports = Cook;
