const mongoose = require('mongoose');
require('dotenv').config();

let connectionStatus = 'connecting to db...';
const URI = process.env.URI

const startDb = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log('db connected');
        connectionStatus = 'Connection established';
    } catch (err) {
        console.log('connection failed', err);
        connectionStatus = 'Failed to establish connection with db';
    }
};

const getConnectionStatus = async () => {
    return JSON.stringify(connectionStatus);
};

module.exports = { startDb, getConnectionStatus };
