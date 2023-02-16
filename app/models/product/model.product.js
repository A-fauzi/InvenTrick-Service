const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const ItemSchema = mongoose.Schema({
  code_items: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    uid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    user_photo: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true
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
  lot: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },

  created_at: String,
  updated_at: String,
});

ItemSchema.statics.customFindOne = function (query, cb) {
  return this.findOne(query, cb)
}

module.exports = mongoose.model("Products", ItemSchema);
