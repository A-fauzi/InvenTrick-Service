const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

var store = require('store');
const { banned_tokens } = require("../controllers/user/user.controller.js");
const { LocalStorage } = require("node-localstorage");



verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // check token banned
    var localStorage = new LocalStorage('./banned_token')
    if (token === localStorage.getItem('banned_token')) {
        return res.status(404).send({
            message: "user is deleted and token not valid"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find({ _id: { $in: user?.roles || '' } },
            (err, roles) => {
                if (err) {
                    if (err.kind === "ObjectId" || err.name === "CastError") {
                        return res.status(401).send({ message: "Unauthorized!" });
                    }

                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user?.roles || '' }
            },
            (err, roles) => {
                if (err) {
                    if (err.kind === "ObjectId" || err.name === "CastError") {
                        return res.status(401).send({ message: "Unauthorized!" });
                    }

                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;