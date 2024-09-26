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

const userSchema =  mongoose.Schema({
    username: String,
    password: String,
    googleId: String, 
    profilePic: String,
});


const providerSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    pin : Number,
    phone : Number

})
const MealModel =  mongoose.model('dabbawalacollection',mealSchema)
const locationModel = mongoose.model('location',locationSchema)
const itemModel = mongoose.model('meal',itemSchema)
const userModel = mongoose.model('user',userSchema)
const providerModel = mongoose.model('provider',providerSchema)
module.exports =  {MealModel,locationModel,itemModel,userModel,providerModel}