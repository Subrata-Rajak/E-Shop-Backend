const Order = require("../models/order_model");

const placeOrder = async (req, res) => {
    const { paymentStatus, addressId, country, state, city, landmark, area, pincode, orderItems, paymentMethod, paymentId, paymentDate, customerEmail, orderSubTotal, totalDiscounts, totalAmount, cancelOrderAction, } = req.body;

    try {
        const currentDate = new Date();

        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 5);

        totalShippingCost = (20 * orderItems.length);

        const newOrder = new Order({
            order_info: {
                order_date: currentDate,
                payment_status: paymentStatus,
                shipping_address: { address_id: addressId, country, state, city, landmark, area, pincode, },
                order_status: "Pending",
            },
            order_items: orderItems,
            payment_info: {
                payment_method: paymentMethod,
                payment_id: paymentId,
                payment_date: paymentDate,
                payment_amount: totalAmount,
            },
            shipping_info: {
                shipping_cost: "20",
                estimated_delivery_date: futureDate,
            },
            customer_info: {
                customer_email: customerEmail,
            },
            order_totals: {
                subtotal: orderSubTotal,
                discounts: totalDiscounts,
                total_amount: totalAmount,
                shipping_cost: totalShippingCost,
            },
            order_actions: {
                cancel_order: cancelOrderAction,
            }
        });

        await newOrder.save();
        res.status(201).send({ message: "Order placed Successfully", newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getAllOrder = async (req, res) => {
    const { email } = req.query;

    try {
        const orders = await Order.find({ 'customer_info.customer_email': email });

        if (!orders) {
            return res.status(404).send({ message: "No order found of this user" });
        }

        res.status(200).send({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order.order_actions.cancel_order) {
            return res.status(400).send({ message: "Sorry, you can't cancel this order now" });
        } else if (order.order_info.order_status == "Cancelled") {
            return res.status(400).send({ message: "Order is already canceled" });
        }

        order.order_info.order_status = "Cancelled";
        await order.save();

        res.status(201).send({ message: "Order cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const orderDelivered = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (order.order_info.order_status == "Delivered") {
            return res.status(400).send({ message: "Order is already delivered" });
        }

        order.order_info.order_status = "Delivered";
        await order.save();

        res.status(201).send({ message: "Order status changed to Delivered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getCancelledOrders = async (req, res) => {
    const { email } = req.query;

    try {
        const cancelledOrders = Order.find({ 'customer_info.customer_email': email, 'order_info.order_status': "Cancelled", });

        if (!cancelledOrders) {
            return res.status(404).send({ message: "This user doesn't have any cancelled order" });
        }

        res.status(200).send({ cancelledOrders });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getDeliveredOrders = async (req, res) => {
    const { email } = req.query;

    try {
        const deliveredOrders = Order.find({ 'customer_info.customer_email': email, 'order_info.order_status': "Delivered", });

        if (!deliveredOrders) {
            return res.status(404).send({ message: "This user doesn't have any delivered order" });
        }

        res.status(200).send({ deliveredOrders });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

const getPendingOrders = async (req, res) => {
    const { email } = req.query;

    try {
        const pendingOrders = Order.find({ 'customer_info.customer_email': email, 'order_info.order_status': "Pending", });

        if (!pendingOrders) {
            return res.status(404).send({ message: "This user doesn't have any pending order" });
        }

        res.status(200).send({ pendingOrders });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong happened" });
    }
}

module.exports = { placeOrder, getAllOrder, cancelOrder, getCancelledOrders, getDeliveredOrders, getPendingOrders, orderDelivered }