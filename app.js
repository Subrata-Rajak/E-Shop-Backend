require('dotenv').config()

const express = require('express');
const connectDb = require('./db/connect_db');
const authRouter = require('./routes/auth_routes');
const productRouter = require('./routes/product_routes');
const userProfileRouter = require('./routes/user_profile_routes');
const productCategoryRouter = require('./routes/product_category_routes');
const wishListRouter = require('./routes/wish_list_routes');
const cartRouter = require('./routes/cart_routes');
const orderRouter = require('./routes/order_routes');
const reviewRouter = require('./routes/review_routes');
const app = express();

app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(userProfileRouter);
app.use(productCategoryRouter);
app.use(wishListRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(reviewRouter)

connectDb(app);