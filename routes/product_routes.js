const express = require('express');
const { addProductCategory } = require('../controllers/product_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const productRouter = express.Router();


module.exports = productRouter