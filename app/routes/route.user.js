const { authJwt } = require("../middlewares");
const controller = require("../controllers/user/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /*
    Catatan: 

    authJwt.verifyToken, : user access
    authJwt.isAdmin, : admin
    authJwt.isModerator : moderator access

    
    */

    app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllUser)
    app.get("/api/user/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.findOneUserById)


    app.delete("/api/user/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteOneById)

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};