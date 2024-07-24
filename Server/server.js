const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes.js');
const PORT = process.env.PORT || 3000
const {startDb} = require('./db.js')
const cors = require('cors')
const Razorpay = require('razorpay')

app.use(router);
app.use(cors())

app.listen(PORT, () => {
    startDb()
  console.log('Server is running...');
});

module.exports = app;
