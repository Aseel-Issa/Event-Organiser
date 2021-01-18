const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MusicSchema = new Schema({
    category: String,
    phone: Number,
    name: String,
    price: Number,
    img: String,
    specialComments: String
})

const Music = mongoose.model("Music", MusicSchema)
module.exports = Music 
