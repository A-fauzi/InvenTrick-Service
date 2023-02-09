const Category = require("../../../models/product/model.product.category.js")

exports.deleteCategories = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Category not found on id " + req.params.categoryId
                })
            }
            res.send({ message: "Category delete successfully." })
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Category not found on id " + req.params.categoryId
                })
            }
            return res.status(500).send({
                message: "Could not delete item on id " + req.params.categoryId
            })
        })
}