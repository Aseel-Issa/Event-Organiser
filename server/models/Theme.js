const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
    title: String,
    mainImg: String,
    Images: [String]
})

const Theme = mongoose.model("Theme", ThemeSchema)
module.exports = Theme
