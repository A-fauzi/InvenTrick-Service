const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/model.items.js");
const { successMessage } = require("../../custom-response/response.success.js");

const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../../uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const uploadImage = multer({
//   storage: storage,
// }).single("image");

exports.create = (req, res) => {
  const item = new Item({
    code_items: req.body.code_items,
    name: req.body.name,
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
