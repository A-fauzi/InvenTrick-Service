const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.items.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.deleteItem = (req, res) => {
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
