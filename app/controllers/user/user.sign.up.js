const { currentDate } = require("../../utils/currentDate.js");
var User = require('../../models/model.user.js')
const { successMessage } = require('../../custom-response/response.success.js')
const { errorMessage } = require('../../custom-response/response.error.js')

exports.signUp = (req, res) => {
    const user = new User({
        uid: req.body.uid,
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        division: req.body.division,
        password: req.body.password,
        created_at: currentDate(),
        updated_at: "",
    })
    user
        .save()
        .then((data) => {
            res.send(successMessage("User registered successfully", data));
        })
        .catch((err) => {
            // Set custom error for unique keys

            console.error(`\nERROR REQUEST: ${errorMessage(err)}`);

            res.status(500).send({
                // message: errorMessage(err),
                message: errorMessage(err)
            });
        });
}