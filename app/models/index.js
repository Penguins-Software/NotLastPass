const dbConfig = require("../../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.passwords = require("./passwords.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.encrypted = require("./encrypted.model")(mongoose);

module.exports = db;