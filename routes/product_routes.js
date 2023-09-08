const express = require('express');
const authMiddleware = require('../middlewares/auth_middleware');
const { addProduct, getAllProducts, getProductById, getProductsByOwner, getProductsByBrand } = require('../controllers/product_controller');

const productRouter = express.Router();

productRouter.get('/product/all', authMiddleware, getAllProducts);
productRouter.get('/product/id', authMiddleware, getProductById);
productRouter.get('/product/owner', authMiddleware, getProductsByOwner);
productRouter.get('/product/brand', authMiddleware, getProductsByBrand);
productRouter.post('/product/add', authMiddleware, addProduct);

module.exports = productRouter