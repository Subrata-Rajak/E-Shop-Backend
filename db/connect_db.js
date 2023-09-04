const mongoose = require('mongoose');
const runServer = require('../server');

const connectDb = (app) => {
    mongoose.connect(process.env.DB_CONNECT_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database Connected");
        runServer(app);
    })
}

module.exports = connectDb;