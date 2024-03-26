const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes.js');
const PORT = process.env.PORT || 3000
const {startDb} = require('./db.js')

app.use(router);

app.listen(PORT, () => {
    startDb()
  console.log('Server is running...');
});

module.exports = app;
