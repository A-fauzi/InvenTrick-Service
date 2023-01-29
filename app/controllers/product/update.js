const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.product.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.update = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    {
      code_items: req.body.code_items,
      name: req.body.name,
      qty: req.body.qty,
      category: req.body.category,
      sub_category: req.body.sub_category,
      image: req.body.image,
      specification: req.body.specification,
      price: req.body.price,
      location: req.body.location,
      status: req.body.status,
      model: req.body.model,
      code_oracle: req.body.code_oracle,
      description_oracle: req.body.description_oracle,
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
      res.send(successMessage('Product updated!'));
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
