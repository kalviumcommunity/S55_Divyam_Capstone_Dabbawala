const express = require('express');
const router = express.Router()
require('dotenv').config()
const mongoose = require('mongoose')
const {getConnectionStatus} = require('./db.js')
const dabbas = require('./dabba.js')
const {MealModel,locationModel,itemModel,userModel} = require('./schema.js')
router.use(express.json());

const cors = require('cors')
router.use(cors())

router.get('/',(req,res)=>{
    res.send('Server deployed')
})


router.get('/db',async (req,res)=>{
    const status = await getConnectionStatus()
    res.send(status)
})

router.get('/dabba',async(req,res)=>{
    try{
        const meals = await MealModel.find({})
        console.log(meals)
        res.status(200).send(meals)
    }catch(err){
        res.status(401).send('error fetching data',err)
    }
   
})

router.get('/location',async(req,res)=>{
    try{
        const locations = await locationModel.find({})
        console.log(locations)
        res.status(200).send(locations)
    }catch(err){
        res.status(401).send('error fetching locations',err)
    }
})

router.get('/item',async(req,res)=>{
    try{
        const items = await itemModel.find({})
        console.log(items)
        res.status(200).send(items)
    }catch(err){
        res.status(500).send('error fetching locations',err)
}})

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user if the username doesn't exist
        const newUser = await userModel.create({
            username: username,
            password: password
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).send('Internal server error');
        console.log('error:', error);
    }
});

router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await userModel.findOne({username,password})
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({user})
    }catch(error){
        res.status(500).send('Internal server error')
        console.log('error',error)
    }
       
})



module.exports = router
