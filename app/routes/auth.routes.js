const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/user/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [authJwt.verifyToken, authJwt.isAdmin],
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signUp
    );

    app.post("/api/auth/signin", controller.signIn);

    // app.post("/api/auth/signout", authJwt.verifyToken, (req, res) => {
    //     res.status(200).json({ message: 'Logout successful' });
    // })
};