const Item = require("../../models/model.user");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.findAllUser = (req, res) => {
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