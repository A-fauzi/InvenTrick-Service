const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const ItemSchema = mongoose.Schema({
    code_items: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    created_at: String
});

module.exports = mongoose.model("Stock_History", ItemSchema);
