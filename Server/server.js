const express = require('express');
const app = express();
require('dotenv').config()
const router = require('./routes.js');
const {startDb} = require('./db.js')
const cors = require('cors')
const Razorpay = require('razorpay')
const PORT = process.env.PORT || 3000;
const { startDb } = require('./db.js');
const cors = require('cors');

app.use(router);
app.use(cors());

const parsedURI = process.env.URI.toString();

startDb(); 

app.listen(process.env.PORT, () => {
    console.log('Server is running...');
    console.log(process.env.URI)
});
