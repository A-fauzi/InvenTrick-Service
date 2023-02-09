const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sub_category: [
        {
            name: {
                type: String,
                required: true
            },
            created_at: String
        }
    ],
    created_at: String,
    updated_at: String,
});

module.exports = mongoose.model("Category", CategorySchema);
