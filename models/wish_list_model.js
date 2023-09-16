const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    user_email: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            product_id: {
                type: String,
                required: true,
            },
            product_name: {
                type: String,
                required: true,
            },
            product_description: {
                type: String,
                required: true,
            },
            product_image_url: {
                type: String,
                required: true,
            },
            product_price: {
                type: Number,
                required: true,
            },
            product_stock: {
                type: Number,
                required: true,
            },
        }
    ],
});

const WishList = mongoose.model("WishList", wishListSchema);
module.exports = WishList;