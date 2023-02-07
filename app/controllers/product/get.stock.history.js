const { errorMessage } = require("../../custom-response/response.error.js");
const { currentDate } = require("../../utils/currentDate.js");
const Item = require("../../models/product/model.product.history.js");
const { successMessage } = require("../../custom-response/response.success.js");

exports.findAllStockHistories = (req, res) => {
    Item.find()
        .then((data) => {
            res.send({
                message: "data items",
                count: `${data.length}`,
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving item.",
            });
        });
};
