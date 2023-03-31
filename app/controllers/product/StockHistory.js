const { errorMessage } = require("../../custom-response/response.error.js");
const { successMessage } = require("../../custom-response/response.success.js");
const Item = require("../../models/product/model.product.history.js")
const { currentDate } = require("../../utils/currentDate.js")

exports.createStockHistory = (req, res) => {

    const item = new Item({
        code_items: req.body.code_items,
        name: req.body.name,
        qty: req.body.qty,
        user_id: req.body.user_id,
        status: req.body.status,
        created_at: currentDate()
    });
    item
        .save()
        .then((data) => {
            res.send(successMessage("Stock history created!", data))
        })
        .catch((err, data) => {
            console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

            res.status(500).send({
                message: errorMessage(err)
            })
        })
} 