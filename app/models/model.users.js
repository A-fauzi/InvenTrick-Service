const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  //   message: String,
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  division: {
    type: String,
    required: true,
  },
  created_at: String,
  updated_at: String,
});

// UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", UserSchema);
