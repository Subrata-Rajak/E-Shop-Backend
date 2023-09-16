const { addToWishlist, getWishlist } = require("../controllers/wishlist_controller");
const authMiddleware = require('../middlewares/auth_middleware.js')

const express = require('express')

const wishListRouter = express.Router();

wishListRouter.post('/wishlist/add', authMiddleware, addToWishlist)
wishListRouter.get('/wishlist/all', authMiddleware, getWishlist)

module.exports = wishListRouter