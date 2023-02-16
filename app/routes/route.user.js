const { userSignUp, userSignIn } = require("../controllers/user/user.controllers");

exports.routeUser = (app) => {
    app.post("/user/register", userSignUp)
};
