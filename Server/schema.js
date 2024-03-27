const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    Name : String,
    items : Array,
    Price : String,
    Img :String
})

const MealModel =  mongoose.model('dabbawalacollection',mealSchema)
module.exports =  {MealModel}