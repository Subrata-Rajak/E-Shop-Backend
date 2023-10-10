const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_info: {
        order_date: {
            type: Date,
            required: true,
        },
        order_status: {
            type: String,
            required: true,
        },
        payment_status: {
            type: String,
            required: true,
        },
        shipping_address: {
            address_id: {
                type: String,
            },
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
        },
    },
    order_items: [],
    payment_info: {
        payment_method: {
            type: String,
            required: true,
        },
        payment_id: {
            type: String,
            required: true,
        },
        payment_amount: {
            type: String,
            required: true,
        },
        payment_date: {
            type: String,
            required: true,
        },
    },
    shipping_info: {
        shipping_cost: {
            type: String,
            required: true,
        },
        estimated_delivery_date: {
            type: Date,
            required: true,
        },
    },
    customer_info: {
        customer_email: {
            type: String,
            required: true,
        },
    },
    order_totals: {
        subtotal: {
            type: String,
            required: true,
        },
        discounts: {
            type: String,
        },
        shipping_cost: {
            type: String,
            required: true,
        },
        total_amount: {
            type: String,
            required: true,
        }
    },
    order_actions: {
        cancel_order: {
            type: Boolean,
            required: true,
        }
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;