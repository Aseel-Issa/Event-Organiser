const express = require('express')
const router = express.Router() 

const Client  = require('../models/Client')
const Event  = require('../models/Event')
const Flowers  = require('../models/Flowers')
const Food  = require('../models/Food')
const Music = require('../models/Music')
const Organizer  = require('../models/Organizer')
const Place  = require('../models/Place')
const Theme  = require('../models/Theme')


/*Event Routes
*/
router.get('/event/:eventId' , function(req , res){
    let ID = req.params.eventId
    Event.find({_id:ID}, function (err, EVentData){
        res.send(EVentData)
    })
})
router.post('/event' , function(req , res){
    let EventData = req.body
    let newEvent = new Event(EventData)
    newEvent.save()
    res.end()

})
router.put('/event/:eventId' , function(req , res){
    let ID = req.params.eventId
    let updatedData = req.body
    Event.findOneAndUpdate({_id :ID}, updatedData ,function(req, res){
        res.end()
    })
})
router.get('/events' , function(req , res){
    Event.find({}, function (err, EVentsData){
        console.log(EVentsData)
        res.send(EVentsData)
    })
})

// Food routes
router.post('/food' , function(req , res){
    let foodData = req.body
    let newFood = new Food(foodData)
    newFood.save()
    res.end()

})
router.put('/food/:foodId' , function(req , res){
    let ID = req.params.foodId
    let updatedData = req.body
    Food.findOneAndUpdate({_id :ID}, updatedData ,function(req, res){
        res.end()
    })
})


// Client routes
router.post('/Client' , function(req , res){
    let clientData = req.body
    let newclient = new CLient(clientData)
    newclient.save()
    res.end()

})

// theme routes
router.post('/theme' , function(req , res){
    let themeData = req.body
    let newtheme = new theme(themeData)
    newtheme.save()
    res.end()

})
router.get('/theme/:category' , function(req , res){
    let category = req.params.category
    Theme.find({category:category}, function (err, themeData){
        res.send(themeData)
    })
})

// orgenaizire routes
router.post('/Organizer' , function(req , res){
    let OrganizerData = req.body
    let newOrganizer = new Organizer(OrganizerData)
    newOrganizer.save()
    res.end()
})

router.get('/Organizer' , function(req , res){
        Organizer.find({}, function (err, OrganizerData){
        console.log(OrganizerData)
        res.send(OrganizerData)
    })
})


module.exports = router