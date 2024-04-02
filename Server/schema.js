const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    Name : String,
    items : Array,
    Price : String,
    Img :String
})

const locationSchema = mongoose.Schema({
    name : String,
    img : String,
    info : String
})

const itemSchema = mongoose.Schema({
    meal : String,
    img : String
})

const userSchema = mongoose.Schema({
    username : String,
    password : String
})
const MealModel =  mongoose.model('dabbawalacollection',mealSchema)
const locationModel = mongoose.model('location',locationSchema)
const itemModel = mongoose.model('meal',itemSchema)
const userModel = mongoose.model('user',userSchema)
module.exports =  {MealModel,locationModel,itemModel,userModel}