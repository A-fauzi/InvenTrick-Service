const { successMessage } = require("../../../custom-response/response.success.js")
const Categories = require("../../../models/product/model.product.category.js")
const { currentDate } = require("../../../utils/currentDate.js")


exports.updateCategories = (req, res) => {
    Categories.findByIdAndUpdate(
        req.params.categoryId,
        {
            name: req.body.name,
            sub_category: req.body.sub_category,
            updated_at: currentDate()
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Category not found on id " + req.params.categoryId
                })
            }
            res.send(successMessage('Category updated.', data))
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Category not found on id " + req.params.categoryId
                })
            }
            console.log(err.message);
            return res.status(500).send({
                message: "Error updating category on id " + req.params.categoryId
            })
        })

}