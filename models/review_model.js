const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        email: {
            type: String,
            required: true,
        },
        profile_image_url: {
            type: String,
            required: true,
        }
    },
    product_id: {
        type: String,
        required: true,
    },
    image_urls: [
        {
            type: String,
        }
    ],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;