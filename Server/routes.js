const express = require('express');
const router = express.Router()
require('dotenv').config()
const mongoose = require('mongoose')
const {getConnectionStatus} = require('./db.js')
const dabbas = require('./dabba.js')
const {MealModel,locationModel,itemModel,userModel,providerModel} = require('./schema.js')
router.use(express.json());
const cors = require('cors');
const Joi = require('joi');
router.use(cors())




const newUserSchema = Joi.object({
    "username": Joi.string().required(),
    "password":Joi.string().required()
})


const newProviderSchema = Joi.object({
    "firstname":Joi.string().required(),
    "lastname":Joi.string().required(),
    "email":Joi.string().required(),
    "password": Joi.string().required(),
    "pin":Joi.number().required(),
    "phone":Joi.number().required()
})

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



router.get('/location/:id', async (req, res) => {
    try {
      const locationId = req.params.id;
      const location = await locationModel.findById(locationId);
      if (!location) {
        return res.status(404).send('Location not found');
      }
      res.status(200).send(location);
    } catch (err) {
      res.status(500).send('Internal server error');
      console.error('Error:', err);
    }
  });

router.get('/item',async(req,res)=>{
    try{
        const items = await itemModel.find({})
        console.log(items)
        res.status(200).send(items)
    }catch(err){
        res.status(500).send('error fetching locations',err)
}})

router.post('/signup', async (req, res) => {
    const { error, value } = newUserSchema.validate(req.body);
    if (error) {
        res.send("Error validating input",error.details);
        console.log(error);
    } else {
        try {
            const { username, password } = req.body;
    
            // Check if the username already exists
            const existingUser = await userModel.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
    
            // Create a new user if the username doesn't exist
            const newUser = await userModel.create({
                username: req.body.username,
                password: req.body.password
            });
    
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).send('Internal server error');
            console.log('error:', error);
        }
    }
});

    
router.post('/login',async(req,res)=>{
    const {error,value} = newUserSchema.validate(req.body);
    if(error){
        res.send("Error validating input",error.details)
    }
    else{
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
           
    }
    
})
router.post('/provsign' ,async(req, res) => {
const{error,value} = newProviderSchema.validate(req.body);
if(error){
    res.send("Error validating input",error.details)
}
else{
    try {
        const { firstname,lastname,email,password,pin,phone } = req.body;

       
        const existingUser = await providerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        
        const newUser = await providerModel.create({
            firstname: firstname,
            lastname: lastname,
            email : email,
            password : password,
            pin : pin,
            phone :phone
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).send('Internal server error');
        console.log('error:', error);
    }
}

});
    

router.post('/provlogin',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await providerModel.findOne({email,password})
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({user})
    }catch(error){
        res.status(500).send('Internal server error')
        console.log('error',error)
    }
       
})


module.exports = router
