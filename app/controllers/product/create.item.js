const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/product/model.product.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.create = (req, res) => {
  const item = new Item({
    code_items: req.body.code_items,
    name: req.body.name,
    qty: 0,
    category: req.body.category,
    sub_category: req.body.sub_category,
    image: req.body.image,
    specification: req.body.specification,
    price: req.body.price,
    location: req.body.location,
    status: req.body.status,
    model: req.body.model,
    lot: req.body.lot,
    exp: req.body.exp,
    created_at: currentDate(),
    updated_at: "",
  });
  item
    .save()
    .then((data) => {
      res.send(successMessage("Create product success!!", data));
    })
    .catch((err, data) => {
      // Set custom error for unique keys

      console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

      res.status(500).send({
        // message: errorMessage(err),
        message: errorMessage(err)
      });
    });
};
