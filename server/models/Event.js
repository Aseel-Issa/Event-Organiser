const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title: String,
    client:{type: Schema.Types.ObjectId, ref: 'Client'},
    status: String,
    occasion: String,
    date: Date,
    startHour: String,
    endHour: String,
    numOfGuests: Number,
    theme: {type: Schema.Types.ObjectId, ref: 'Theme'},
    food: [{
              id: {type: Schema.Types.ObjectId, ref: 'Food'}, 
              price: Number
           }],
    flowers: [{
                id:{type: Schema.Types.ObjectId, ref: 'Flowers'},
                onTable: Boolean,
                onEntry: Boolean,
                numOfStands: Number
            }],
    music:  {
              id:{type: Schema.Types.ObjectId, ref: 'Music'},
              price: Number
            },
    place:  {type: Schema.Types.ObjectId, ref: 'Place'},
    organizer:  {type: Schema.Types.ObjectId, ref: 'Organizer'}
})


const Event = mongoose.model("Event", EventSchema)
module.exports = Event 
