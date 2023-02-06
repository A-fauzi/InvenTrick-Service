const Item = require("../../models/model.product.js");

exports.findOneByCode = (req, res) => {
    const query = req.query

    Item.customFindOne(query, (err, data) => {
        if (err) return res.status(500).send(err)
        return res.send(data)
    })
};
