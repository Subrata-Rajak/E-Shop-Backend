const mongoose = required('mongoose');

const Schema = mongoose.Schema;

const cartSchema = Schema({
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
            }
        }
    ],
});