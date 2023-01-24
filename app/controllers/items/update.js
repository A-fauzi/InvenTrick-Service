const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.items.js");
const { successMessage } = require("../../custom-response/response.success.js");

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
