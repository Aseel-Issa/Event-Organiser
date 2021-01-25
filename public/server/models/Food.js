const mongoose = require('mongoose')
const Schema = mongoose.Schema
// id, category, name, ingredients, quantity, price, img, specialComments, flavor
const FoodSchema = new Schema({
    name: String,
    category: String,
    ingredients: String,
    quantity: Number,
    price: Number,
    img: String,
    specialComments: String,
    flavor: String
})

const Food = mongoose.model("Food", FoodSchema)
module.exports = Food 
