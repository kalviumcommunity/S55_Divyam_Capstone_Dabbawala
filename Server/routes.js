const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const { MealModel, locationModel, itemModel, userModel, providerModel } = require('./schema.js');
router.use(express.json());
const cors = require('cors');
const Joi = require('joi');
router.use(cors());
const jwt = require('json-web-token');
const rateLimit = require('express-rate-limit');

const newUserSchema = Joi.object({
    "username": Joi.string().required(),
    "password": Joi.string().required()
});


const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 20, 
    message: "Too many requests from this IP, please try again after 15 minutes",
  });
  
  router.use(limiter);

const newProviderSchema = Joi.object({
    "firstname": Joi.string().required(),
    "lastname": Joi.string().required(),
    "email": Joi.string().required(),
    "password": Joi.string().required(),
    "pin": Joi.number().required(),
    "phone": Joi.number().required()
});

const handleRequest = async (res, model) => {
    try {
        const data = await model.find(); // Fetch all documents from the model
        res.status(200).json(data); // Send the response with the data
    } catch (error) {
        console.error(`Error retrieving data from ${model.modelName}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

router.get('/', (req, res) => {
    res.send('Server deployed');
});

router.get('/users', async (req, res) => handleRequest(res, userModel));
router.get('/meals', async (req, res) => handleRequest(res, MealModel));
router.get('/locations', async (req, res) => handleRequest(res, locationModel));
router.get('/providers', async (req, res) => handleRequest(res, providerModel));
router.get('/items', async (req, res) => handleRequest(res, itemModel));

router.post('/login', async (req, res) => {
    const { error } = newUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/auth', (req, res) => {
    try {
        const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ "AT": accessToken });
    } catch (err) {
        console.error('Error generating access token:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/googleAuthLogin', async (req, res) => {
    try {
        const { googleId, username, profilePic } = req.body;
        let user = await userModel.findOne({ googleId });

        if (!user) {
            return res.status(404).json({ error: 'User does not exist. Please sign up first.' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Google Login Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/googleAuthSignup', async (req, res) => {
    try {
        const { googleId, username, profilePic } = req.body;

        const existingUser = await userModel.findOne({ googleId });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await userModel.create({ googleId, username, profilePic });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error during Google signup:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { error } = newUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new userModel({ username, password });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/changePassword', async (req, res) => {
    const passwordSchema = Joi.object({
        "username": Joi.string().required(),
        "currentPassword": Joi.string().required(),
        "newPassword": Joi.string().required()
    });

    const { error } = passwordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const { username, currentPassword, newPassword } = req.body;

        const user = await userModel.findOne({ username, password: currentPassword });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or current password' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
