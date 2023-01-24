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

  created_at: String,
  updated_at: String,
});

// ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Items", ItemSchema);
