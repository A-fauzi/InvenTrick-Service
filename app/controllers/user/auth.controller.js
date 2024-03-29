const config = require("../../config/auth.config");
const db = require("../../models/index");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signUp = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        profile_image: "null",
        password: bcrypt.hashSync(req.body.password, 8),
        fullName: req.body.fullName,
        position: req.body.position,
        path_storage: "null",
        jwt_token: "null"
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({
                            message: "User was registered successfully!",
                            data: {
                                "_id": user._id,
                                username: user.username,
                                email: user.email,
                                fullName: user.fullName,
                                position: user.position
                            }
                        });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({
                        message: "User was registered successfully!",
                        data: {
                            "_id": user._id,
                            username: user.username,
                            email: user.email,
                            fullName: user.fullName,
                            position: user.position
                        }
                    });
                });
            });
        }
    });
};

exports.signIn = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            updateToken(user._id, user.username, user.fullName, user.profile_image, user.path_storage, user.email, user.position, authorities, token, res)
        });
};

function updateToken(idUser, username, fullName, profile_image, path_storage, email, position, authorities, token, res) {
    User.findByIdAndUpdate(idUser, {
        jwt_token: token
    }, { new: true })
        .then(() => {
            res.status(200).send({
                message: `update token success on id ${idUser}`,
                data: {
                    '_id': idUser,
                    username: username,
                    fullName: fullName,
                    profile_image: profile_image,
                    email: email,
                    position: position,
                    // roles: authorities,
                    'jwt_token': token,
                    path_storage: path_storage
                }
            });

        })
        .catch((err) => {
            console.log(err.message);
            res.send({
                message: "update token failed on id " + idUser
            })
        })
}