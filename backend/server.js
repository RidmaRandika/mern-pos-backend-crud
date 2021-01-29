const express = require('express');
const cors  = require('cors');
const mongoose  = require('mongoose');
require('dotenv').config();

const customerRouter = require('./routes/customer');
const orderRouter = require('./routes/order');
const itemRouter = require('./routes/item');
const orderDetailRouter = require('./routes/orderdetails');

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.use('/customers',customerRouter);
app.use('/orders',orderRouter);
app.use('/orderdetails',orderDetailRouter);
app.use('/items',itemRouter);

const url = process.env.URL;

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}) 


app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})