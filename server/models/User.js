const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    password: String,
    userType: String
})

const User = mongoose.model("User", UserSchema)
module.exports = User 
