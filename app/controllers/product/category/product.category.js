const { errorMessage } = require("../../../custom-response/response.error")
const { successMessage } = require("../../../custom-response/response.success.js")
const Category = require("../../../models/product/model.product.category.js")
const { currentDate } = require("../../../utils/currentDate")

exports.createCategory = (req, res) => {
    const category = new Category({
        name: req.body.name,
        sub_category: req.body.sub_category,
        created_at: currentDate(),
        updated_at: "not updated yet."
    })

    category
        .save()
        .then((data) => {
            res.send(successMessage("Create category success", data))
        })
        .catch((err, data) => {
            console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

            res.status(500).send({
                message: errorMessage(err)
            })
        })

}