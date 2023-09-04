const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;