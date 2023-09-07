const express = require('express');
const { getAllProductCategories, addProductCategory, addSubCategory } = require('../controllers/product_category_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const productCategoryRouter = express.Router();

productCategoryRouter.get('/categories/all', authMiddleware, getAllProductCategories);
productCategoryRouter.post('/categories/add', authMiddleware, addProductCategory);
productCategoryRouter.post('/categories/subCategory', authMiddleware, addSubCategory);

module.exports = productCategoryRouter;