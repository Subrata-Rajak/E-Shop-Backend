const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
            product_price: {
                type: Number,
                required: true,
            },
            product_stock: {
                type: Number,
                required: true,
            },
            cart_quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            product_image_url: {
                type: String,
                required: true,
            }
        }
    ],
});

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart