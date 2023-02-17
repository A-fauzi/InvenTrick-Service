const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose

db.user = require("./model.user")
db.role = require("./model.role")

db.ROLES = ["user", "admin", "moderator"]

module.exports = db