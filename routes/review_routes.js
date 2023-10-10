const express = require('express')
const authMiddleware = require('../middlewares/auth_middleware');
const { addReview, deleteReview, getReviewsOfUser, getReviewsOfProduct, getProductRating } = require('../controllers/review_controller');

const reviewRouter = express.Router();

reviewRouter.post('/review/add', authMiddleware, addReview);
reviewRouter.post('/review/delete', authMiddleware, deleteReview);
reviewRouter.get('/review/user', authMiddleware, getReviewsOfUser);
reviewRouter.get('/review/product', authMiddleware, getReviewsOfProduct);
reviewRouter.get('/review/rating', authMiddleware, getProductRating);

module.exports = reviewRouter