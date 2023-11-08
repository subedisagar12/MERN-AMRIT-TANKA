const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 64,
  },

  age: {
    type: Number,
    required: true,
    min: 12,
    max: 150,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
