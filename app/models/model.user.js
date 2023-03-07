const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        // uid: {
        // type: String,
        // required: [true, "uid is required!"],
        // unique: [true, "uid already exists!"]
        // },
        username: {
            type: String,
            required: [true, "username is required"],
        },
        fullName: {
            type: String,
            required: [true, "fullname is required"],
        },
        email: {
            type: String,
            unique: [true, "email already exists in database!"],
            lowercase: true,
            trim: true,
            required: [true, "email is required"],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: '{VALUE} is not a valid email!'
            }

        },
        profile_image: {
            type: String,
            required: [true, "image is required"],
        },
        path_storage: {
            type: String,
            required: [true, "image is required"],
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
                required: [true, "Please specify user role"]
            }
        ],
        division: {
            type: String,
            required: [true, "divisi is required!"]
        },
        status_activity: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        jwt_token: {
            type: String,
        },
        created_at: String,
        updated_at: String,
    })
);

module.exports = User
