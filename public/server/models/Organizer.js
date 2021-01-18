const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrganizerSchema = new Schema({
    name: String,
    phone: Number,
    email: String
})

const Organizer = mongoose.model("Organizer", OrganizerSchema)
module.exports = Organizer 
