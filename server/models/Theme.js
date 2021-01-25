const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
    title: String,
    mainImg: String,
    category: String,
    images: [String]
})

const Theme = mongoose.model("Theme", ThemeSchema)
module.exports = Theme
