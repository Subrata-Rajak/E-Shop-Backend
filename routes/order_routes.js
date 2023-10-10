const express = require("express");
const authMiddleware = require('../middlewares/auth_middleware');
const { placeOrder, getAllOrder, cancelOrder, getCancelledOrders, getDeliveredOrders, getPendingOrders, orderDelivered } = require("../controllers/order_controller");

const orderRouter = express.Router();

orderRouter.post('/order/place', authMiddleware, placeOrder)
orderRouter.get('/order/all', authMiddleware, getAllOrder)
orderRouter.post('/order/cancel', authMiddleware, cancelOrder)
orderRouter.get('/order/cancel/all', authMiddleware, getCancelledOrders)
orderRouter.get('/order/delivered/all', authMiddleware, getDeliveredOrders)
orderRouter.get('/order/pending', authMiddleware, getPendingOrders)
orderRouter.post('/order/delivered', authMiddleware, orderDelivered)

module.exports = orderRouter;