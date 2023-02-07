const Item = require("../../models/product/model.product.js");

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
