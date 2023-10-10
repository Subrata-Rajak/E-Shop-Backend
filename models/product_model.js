const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    owner_info: {
        email: {
            type: String,
            required: true,
        }
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
    },
    brand: {
        type: String,
        required: true,
    },
    image_url: [
        {
            type: String,
        }
    ],
    stock_quantity: {
        type: Number,
        required: true,
    },
    reviews: [
        {
            type: String,
        }
    ],
    discount: {
        type: Number,
    },
    coupons: [
        {
            coupon_type: {
                type: String,
            },
            coupon_description: {
                type: String,
            },
            coupon_discount: {
                type: Number,
            }
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
