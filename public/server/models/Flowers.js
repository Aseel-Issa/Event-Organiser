const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlowersSchema = new Schema({
    Name: String,
    Img: String,
    tablePrice: Number,
    entryPrice: Number,
    standPrice: Number
})


const Flowers = mongoose.model("Flowers", FlowersSchema)
module.exports = Flowers 
