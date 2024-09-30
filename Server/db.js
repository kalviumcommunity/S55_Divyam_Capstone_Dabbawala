const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron'); 
require('dotenv').config();
const fs = require('fs'); 

let connectionStatus = 'connecting to db...';

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

cron.schedule('0 * * * *', async () => {
    const status = await getConnectionStatus();
    console.log('Running cron job at:', new Date());
    console.log('Connection status:', status);

    fs.appendFileSync('cron-log.txt', `Cron job executed at: ${new Date()}\nConnection status: ${status}\n\n`);
});

startDb();

module.exports = { startDb, getConnectionStatus };
