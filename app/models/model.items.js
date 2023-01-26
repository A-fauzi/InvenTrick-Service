const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const ItemSchema = mongoose.Schema({
  code_items: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  code_oracle: {
    type: String,
    required: true,
  },
  description_oracle: {
    type: String,
    required: true,
  },

  created_at: String,
  updated_at: String,
});

// ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Items", ItemSchema);
