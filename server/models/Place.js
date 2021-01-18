const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaceSchema = new Schema({
    category: String,
    name: String,
    address: String,
    img: String,
    specialComments: String,
    price: Number,
    phone: Number
})

const Place = mongoose.model("Place", PlaceSchema)
module.exports = Place 
