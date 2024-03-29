const { LocalStorage } = require("node-localstorage");
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

exports.findAllUser = async (req, res) => {

    try {
        // We destructure the req.query object to get the page and limit variables from url 
        const { page = 1, limit = 10 } = req.query;

        const item = await Item.find({ ...req.query })
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(limit * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * limit)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ _id: -1 })
            .populate("roles", "-__v")

        // Getting the numbers of products stored in database
        const count = await Item.countDocuments();

        return res.status(200).json({
            message: "data items",
            totalCount: count,
            countPerPage: `${item.length}`,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: item,
        });

    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving item.",
        });
        // next(err);
    }



    // Item.find()
    //     .sort({ _id: -1 })
    //     .populate("roles", "-__v")
    //     .then((data) => {
    //         res.send({
    //             message: "data items",
    //             count: `${data.length}`,
    //             data: data
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving item.",
    //         });
    //     });
};

exports.findOneUserById = (req, res) => {
    Item.findById(req.params.userId)
        .populate("roles", "-__v")
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

exports.updateUserById = (req, res) => {

    //BUG:  Jika request tidak di isi, masih bisa lolos
    Item.findByIdAndUpdate(
        req.params.userId,
        {
            username: req.body.username,
            email: req.body.email,
            profile_image: req.body.profile_image,
            fullName: req.body.fullName,
            position: req.body.position,
            path_storage: req.body.path_storage,
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            res.send({
                message: "User was update successfully!",
                data: {
                    "_id": data._id,
                    username: data.username,
                    email: data.email,
                    fullName: data.fullName,
                    position: data.position
                }
            });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            console.log(err.message);
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId,
            });
        });
}

exports.deleteOneById = (req, res) => {
    Item.findByIdAndRemove(req.params.userId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            var localStorage = new LocalStorage('./banned_token')
            localStorage.setItem('banned_token', data.jwt_token)
            res.send({
                message: "user deleted successfully!",
                banned_token: localStorage.getItem('banned_token'),
            });
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

exports.updateStatusActivityUser = (req, res) => {
    Item.findByIdAndUpdate(req.params.userId, {
        status_activity: req.body.status_activity
    },
        { new: true }
    )
        .populate("roles", "-__v")
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            res.send(successMessage('Status updated!', data));
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId,
                });
            }
            console.log(err.message);
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId,
            });
        });
}
