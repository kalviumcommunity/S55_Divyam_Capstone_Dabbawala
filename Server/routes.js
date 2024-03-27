const express = require('express');
const router = express.Router()
require('dotenv').config()
const mongoose = require('mongoose')
const {getConnectionStatus} = require('./db.js')
const dabbas = require('./dabba.js')
const {MealModel} = require('./schema.js')
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


module.exports = router
