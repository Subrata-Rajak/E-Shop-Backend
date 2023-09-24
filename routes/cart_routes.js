const express = require('express')
const authMiddleWare = require('../middlewares/auth_middleware');
const { getAllCartItems, addToCart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, isProductInCart } = require('../controllers/cart_controller');

const cartRouter = express.Router();

cartRouter.get("/cart/all", authMiddleWare, getAllCartItems)
cartRouter.post('/cart/add', authMiddleWare, addToCart)
cartRouter.post('/cart/remove', authMiddleWare, removeFromCart)
cartRouter.post('/cart/quantity/increase', authMiddleWare, increaseProductQuantity)
cartRouter.post('/cart/quantity/decrease', authMiddleWare, decreaseProductQuantity)
cartRouter.get('/cart/product', authMiddleWare, isProductInCart)

module.exports = cartRouter;