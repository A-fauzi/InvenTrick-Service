const Item = require("../../models/product/model.product.js");

exports.findOneByCode = (req, res) => {
    const query = req.query

    Item.customFindOne(query)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Item not found on id"
                })
            }
            res.send(data)
        }).catch((err) => {
            return res.status(500).send({
                message: "Error retrieving item on id "
            });
        });
};
