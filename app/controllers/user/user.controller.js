const { successMessage } = require("../../custom-response/response.success");
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
        .populate("roles", "-__v")
        .then((data) => {
            res.send({
                message: "data items",
                count: `${data.length}`,
                data: data
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving item.",
            });
        });
};

exports.findOneUserById = (req, res) => {
    Item.findById(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            res.send(successMessage('Data user', data));
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId,
            });
        });
}

// exports.updateUserById = () => {

// }

exports.deleteOneById = (req, res) => {
    Item.findByIdAndRemove(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            res.send({ message: "user deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId,
            });
        });
}