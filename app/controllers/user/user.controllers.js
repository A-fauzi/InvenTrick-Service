const { signUp } = require("./user.sign.up.js")

exports.userSignUp = (req, res) => {
    signUp(req, res)
}