const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const ItemSchema = mongoose.Schema({
    uid: {
        type: String,
        required: [true, "uid is required!"],
        unique: [true, "uid already exists!"]
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
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    division: {
        type: String,
        required: [true, "divisi is required!"]
    },
    password: {
        type: String,
        required: true
    },
    created_at: String,
    updated_at: String,
});

module.exports = mongoose.model("User", ItemSchema);
