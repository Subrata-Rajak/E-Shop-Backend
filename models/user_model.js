const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profile_image_url: {
        type: String,
    },
    reviews_and_ratings: [
        {
            type: String,
        }
    ],
    address: [
        {
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            area: {
                type: String,
            },
            landmark: {
                type: String
            },
            pincode: {
                type: String,
            },
            selected: {
                type: Boolean,
                default: false,
            }
        }
    ],
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;