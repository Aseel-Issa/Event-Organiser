const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: String,
    client: String, // id
    status: String,
    occasion: String,
    date: Date,
    startHour: String,
    endHour: String,
    numOfGuests: Number,
    theme: String, // id
    food: [{
              id: String, // id 
              price: Number
           }],
    flowers: {
                id: String, // id
                onTable: Boolean,
                onEntry: Boolean,
                numOfStands: Number
            },
    music:  {
              id: String, // id
              price: Number
            },
    place:  String, // id
    organizer: String // id
})


const Event = mongoose.model("Event", EventSchema)
module.exports = Event 
