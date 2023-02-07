const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/product/model.product.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.findOne = (req, res) => {
  Item.findById(req.params.itemId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "item not found with id " + req.params.itemId,
        });
      }
      res.send(successMessage('Data item', data));
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
