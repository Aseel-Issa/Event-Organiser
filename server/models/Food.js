const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
    name: String,
    category: String,
    ingredients: String,
    price: Number,
    img: String
})

const Food = mongoose.model("Food", FoodSchema)
module.exports = Food 
