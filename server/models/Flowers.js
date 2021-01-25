const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlowersSchema = new Schema({
    category: String,
    img: String,
    onTablePrice: Number,
    onEntryPrice: Number,
    standPrice: Number
})


const Flowers = mongoose.model("Flowers", FlowersSchema)
module.exports = Flowers 
