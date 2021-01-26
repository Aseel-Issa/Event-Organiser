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
                table: {
                    onTable: Boolean,
                    price: Number
                },
                entry: {
                    onEntry: Boolean,
                    price: Number
                },
                stands: {
                    numOfStands: Number,
                    price: Number
                }
            },
    musicList:  [{
              id: String, // id
              price: Number
            }],
    place:  String, // id
    organiser: String, // id
    assignmentRequests: [String] // array of organiser's ids
})


const Event = mongoose.model("Event", EventSchema)
module.exports = Event 
