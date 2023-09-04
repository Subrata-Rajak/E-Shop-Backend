require('dotenv').config()

const express = require('express');
const connectDb = require('./db/connect_db');
const authRouter = require('./routes/auth_routes');
const app = express();

app.use(express.json());
app.use(authRouter);

connectDb(app);