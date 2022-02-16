const mongoose = require("mongoose");

const redmineSchema = new mongoose.Schema({
    rm_id: Number,
    login: String,
    firstname: String,
    lastname: String,
    mail: String,
    gender: String,
    designation: String,
    mobile: Number,
    avatar: String,
    status: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model("redmineSchema", redmineSchema);