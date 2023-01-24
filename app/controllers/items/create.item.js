const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.items.js");
const { successMessage } = require("../../custom-response/response.success.js");

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
