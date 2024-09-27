const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const { MealModel, locationModel, itemModel, userModel, providerModel } = require('./schema.js');
router.use(express.json());
const cors = require('cors');
const Joi = require('joi');
router.use(cors());
const jwt = require('jsonwebtoken')

const newUserSchema = Joi.object({
    "username": Joi.string().required(),
    "password": Joi.string().required()
});

const newProviderSchema = Joi.object({
    "firstname": Joi.string().required(),
    "lastname": Joi.string().required(),
    "email": Joi.string().required(),
    "password": Joi.string().required(),
    "pin": Joi.number().required(),
    "phone": Joi.number().required()
});

router.get('/', (req, res) => {
    res.send('Server deployed');
});

router.post('/login', async (req, res) => {
    const { error } = newUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }

    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Login error:', error);
    }
});

router.post('/auth', (req, res) => {
    try {
        const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ "AT": accessToken })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "Message": "Internal Server Error" })
    }
})


router.post('/googleAuthLogin', async (req, res) => {
    try {
        const { googleId, username, profilePic } = req.body;
        let user = await userModel.findOne({ googleId });

        if (!user) {
            return res.status(404).json({ error: 'User does not exist. Please sign up first.' });
        } 
        
        // User exists, login
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
        return res.status(400).json({ error: error.details });
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
        res.status(500).json({ error: 'Internal server error' });
        console.error('Signup error:', error);
    }
});

module.exports = router;
