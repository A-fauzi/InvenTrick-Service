const { errorMessage } = require("../../custom-response/response.error.js");
const User = require("../../models/model.users.js");
const { currentDate } = require("../../utils/currentDate.js");
const { successMessage } = require("../../custom-response/response.success.js");

// Create and save a new user
exports.create = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    division: req.body.division,
    created_at: currentDate(),
    updated_at: "",
  });
  user
    .save()
    .then((data) => {
      res.send(successMessage(data.fullName));
    })
    .catch((err) => {
      // Set custom error for unique keys

      console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

      res.status(500).send({
        // message: errorMessage(err),
        message: errorMessage(err),
      });
    });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

// Find a single message with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Update a message identified by the userId in the request
exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    {
      fullName: req.body.fullName,
      email: req.body.email,
      division: req.body.division,
      updated_at: currentDate(),
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      console.log(err.message);
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Delete a message with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
