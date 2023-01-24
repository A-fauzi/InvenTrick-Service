const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.items.js");
const { successMessage } = require("../../custom-response/response.success.js");

// Create and save a new item
exports.create = (req, res) => {
  const item = new Item({
    code_items: req.body.code_items,
    name: req.body.name,
    category: req.body.category,
    created_at: currentDate(),
    updated_at: "",
  });
  item
    .save()
    .then((data) => {
      res.send(successMessage(data));
    })
    .catch((err) => {
      // Set custom error for unique keys

      console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

      res.status(500).send({
        // message: errorMessage(err),
        message: errorMessage(err),
      });
    });
};

// Retrieve all item from the database.
exports.findAll = (req, res) => {
  Item.find()
    .then((data) => {
      res.send({
        message: "data items",
        count: `Jumlah items ${data.length}`,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving item.",
      });
    });
};

// Find a single message with a itemId
exports.findOne = (req, res) => {
  Item.findById(req.params.itemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving item with id " + req.params.itemId,
      });
    });
};

// Update a message identified by the itemId in the request
exports.update = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    {
      name: req.body.name,
      category: req.body.category,
      updated_at: currentDate(),
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      console.log(err.message);
      return res.status(500).send({
        message: "Error updating item with id " + req.params.itemId,
      });
    });
};

// Delete a message with the specified itemId in the request
exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params.itemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      res.send({ message: "item deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      return res.status(500).send({
        message: "Could not delete item with id " + req.params.itemId,
      });
    });
};
