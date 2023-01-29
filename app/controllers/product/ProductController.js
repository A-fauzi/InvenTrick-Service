const { create } = require("./create.item.js");
const { deleteItem } = require("./delete.item.js");
const { findAll } = require("./find.all.js");
const { findOne } = require("./find.one.js");
const { update } = require("./update.js");

// Create and save a new item
exports.createProduct = (req, res) => {
  create(req, res);
};

// Retrieve all item from the database.
exports.findAllProduct = (req, res) => {
  findAll(req, res);
};

// Find a single message with a itemId
exports.findOneProduct = (req, res) => {
  findOne(req, res);
};

// Update a message identified by the itemId in the request
exports.updateProduct = (req, res) => {
  update(req, res);
};

// Delete a message with the specified itemId in the request
exports.deleteProduct = (req, res) => {
  deleteItem(req, res);
};
