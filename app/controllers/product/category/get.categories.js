const Categories = require("../../../models/product/model.product.category.js")

exports.getAllCategories = (req, res) => {
    Categories.find()
        .then((data) => {
            res.send({
                message: "categories",
                count: `${data.length}`,
                data: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving item."
            })
        })
}