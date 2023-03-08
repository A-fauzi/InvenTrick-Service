const { create } = require("./create.item.js");
const { deleteItem } = require("./delete.item.js");
const { findAll } = require("./find.all.js");
const { findOne } = require("./find.one.js");
const { update } = require("./update.js");
const { findOneByCode } = require("./findByCode.js");
const { createStockHistory } = require("./StockHistory.js");
const { findAllStockHistories } = require("./get.stock.history.js");
const { createCategory } = require("./category/create.category.js");
const { getAllCategories } = require("./category/get.categories.js");
const { updateCategories } = require("./category/update.category.js");
const { deleteCategories } = require("./category/delete.category.js");
const { findByUserId } = require("./findByUserId.js");


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

exports.findOneByCode = (req, res) => {
  findOneByCode(req, res)
}

exports.stockHistory = (req, res) => {
  createStockHistory(req, res)
}

exports.getStockHistories = (req, res) => {
  findAllStockHistories(req, res)
}

// category product
exports.createCategoryController = (req, res) => {
  createCategory(req, res)
}

exports.getAllCategories = (req, res) => {
  getAllCategories(req, res)
}

exports.updateCategory = (req, res) => {
  updateCategories(req, res)
}

exports.deleteCategory = (req, res) => {
  deleteCategories(req, res)
}

exports.findProdByUserId = (req, res) => {
  findByUserId(req, res)
}