const mongoose = require("mongoose");

// const addressSchema = mongoose.Schema({
//   country: String,
//   state: String,
// });

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 10,
  },
  author: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    min: 100,
    max: 1000,
    // required: true,
  },

  userId: {
    type: String,
  },
  // is_available: Boolean,
  // address: addressSchema,
});

const BookModel = mongoose.model("Book", bookSchema);
// const AddressModel=mongoose.model("Address",addressSchema)

module.exports = BookModel;

// Create a model to store student
// the model should store name,image,grade,roll,age
// create a route to add a new student

// Add validation -> server side as well as db side
//Name cannot be empty
//grade should not be less than 1 and greater than 12
//roll shouldnot be less than 1
//age shouldnot be less than 5 and greater than 24
