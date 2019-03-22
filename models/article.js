// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new Article object
// This is similar to a Sequelize model
var Article = new Schema({
  // `string` must be of type String. We "trim" it to remove any trailing white space
  // `string` is a required field, and a custom error message is thrown if it is not supplied
  Title: {
    type: String,
    required: "String is Required",
    unique: true,
  },
  // `number` is of type Number
  // `number` must be unique
  // `number` is required. The default mongoose error message is thrown if it is not supplied
  Link: {
    type: String,
    required: true
  },
  Saved: {
    type: Boolean,
    required: "String is Required",
    default: false,
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", Article);

// Export the Article model
module.exports = Article;
