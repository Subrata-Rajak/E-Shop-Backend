const { addToWishlist, getWishlist, removeFromWishlist, isProductInWishlist } = require("../controllers/wishlist_controller");
const authMiddleware = require('../middlewares/auth_middleware.js')

const express = require('express')

const wishListRouter = express.Router();

wishListRouter.post('/wishlist/add', authMiddleware, addToWishlist)
wishListRouter.post('/wishlist/remove', authMiddleware, removeFromWishlist)
wishListRouter.get('/wishlist/all', authMiddleware, getWishlist)
wishListRouter.get('/wishlist/product', authMiddleware, isProductInWishlist)

module.exports = wishListRouter