const express = require('express')
const router = express.Router()

const Client = require('../models/Client')
const Event = require('../models/Event')
const Flowers = require('../models/Flowers')
const Food = require('../models/Food')
const Music = require('../models/Music')
const Organizer = require('../models/Organizer')
const Place = require('../models/Place')
const Theme = require('../models/Theme')
const User = require('../models/User')


/*Event Routes
*/

async function papulateEvent(event) {
    event.client = await Client.find({ _id: event.client })
    event.theme = await Theme.find({ _id: event.theme })
    event.place = await Place.find({ _id: event.place })
    event.organizer = await Organizer.find({ _id: event.organizer })
    if (event.music != null) {
        event.music.id = await Music.find({ _id: event.music.id })
    }
    if (event.flowers != null) {
        event.flowers.id = await Flowers.find({ _id: event.flowers.id })
    }
    for (let food of event.food) {
        food.id = await Food.find({ _id: food.id })
    }
    return event
}


router.get('/event/:eventId', function (req, res) {
    let ID = req.params.eventId
    Event.find({ _id: ID }, function (err, eventData) {
        res.send(eventData)
    })
})
router.get('/events', function (req, res) {
    Event.find({}, function (err, eventData) {
        res.send(eventData)
    })
    // let temp = {}
    // Event.find({}, async function (err, EVentData){
    //     // temp = await papulateEvent(EVentData)
    //     res.send(temp)
    // })
})
router.post('/event', function (req, res) {
    let EventData = req.body
    console.log(EventData)
    let newEvent = new Event(EventData)
    console.log(newEvent)
    newEvent.save()
    res.send({ id: newEvent._id })

})
router.put('/event', function (req, res) {
    let ID = req.body.id
    let updatedData = req.body
    Event.findOneAndUpdate({ _id: ID }, updatedData, function (req, res) {
        res.end()
    })
})

router.get('/events/client/:clientId', async function (req, res) {
    let eventsToBeSent
    let ID = req.params.clientId
    let events = await Event.find({ client: ID })
    // console.log(events)
    eventsToBeSent = await Promise.all(events.map(async function (element) {
        let event = { ...element._doc }
        // loading client's data
        let clients = await User.find({ _id: ID })
        event.client = { ...clients[0]._doc }
        event.client.id = clients[0]._doc._id

        // loading flowers data
        if (event.flowers != null && event.flowers != undefined) {
            let flower = await Flowers.find({ _id: event.flowers.id })
            event.flowers.category = flower[0]._doc.category
            event.flowers.img = flower[0]._doc.img
        } else {
            event.flowers = {}
        }
        // loading theme data
        if (event.theme != null && event.theme != undefined) {
            let theme = await Theme.find({ _id: event.theme })
            event.theme = { ...theme[0]._doc }
            event.theme.id = theme[0]._doc._id
        } else {
            event.theme = {}
        }

        // loading place data
        if (event.place != null && event.place != undefined) {
            let place = await Place.find({ _id: event.place })
            event.place = { ...place[0]._doc }
            event.place.id = place[0]._doc._id
        } else {
            event.place = {}
        }

        //loading Food data
        if (event.food != null && event.food != undefined) {
            let foodList = await Promise.all(event.food.map(async function (element) {
                let food = await Food.find({ _id: element.id })
                let newElement = { ...element._doc }
                newElement.category = food[0].category
                newElement.name = food[0].name
                newElement.ingredients = food[0].ingredients
                newElement.img = food[0].img
                return newElement
            }))
            event.food = foodList
        } else {
            event.food = []
        }

        //loading Music data
        if (event.musicList != null && event.musicList != undefined) {
            let musicList = await Promise.all(event.musicList.map(async function (element) {
                let music = await Music.find({ _id: element.id })
                let newElement = { ...element._doc }
                newElement.category = music[0].category
                newElement.name = music[0].name
                newElement.phone = music[0].phone
                newElement.img = music[0].img
                return newElement
            }))
            event.musicList = musicList
        } else {
            event.musicList = []
        }

        //loading organiser
        if (event.organiser != null && event.organiser != undefined) {
            let organisers = await User.find({ _id: event.organiser })
            event.organiser = { ...organisers[0]._doc }
            event.organiser.id = organisers[0]._doc._id
        } else {
            event.organiser = {}
        }

        // console.log(theme)
        return event
    }))
    res.send(eventsToBeSent)
})
router.get('/events/pending', async function (req, res) {
    let eventsToBeSent
    let ID = req.params.clientId
    let events = await Event.find({ status: 'Pending' })
    // eventsToBeSent= events
    console.log(events)
    eventsToBeSent = await Promise.all(events.map(async function (element) {
        let event = { ...element._doc }
        // console.log(event)
        // loading client's data
        let clients = await User.find({ _id: event.client })
        console.log(clients)
        event.client = { ...clients[0]._doc }
        event.client.id = clients[0]._doc._id

        // loading flowers data
        if (event.flowers != null && event.flowers != undefined) {
            let flower = await Flowers.find({ _id: event.flowers.id })
            event.flowers.category = flower[0]._doc.category
            event.flowers.img = flower[0]._doc.img
        } else {
            event.flowers = {}
        }
        // loading theme data
        if (event.theme != null && event.theme != undefined) {
            let theme = await Theme.find({ _id: event.theme })
            event.theme = { ...theme[0]._doc }
            event.theme.id = theme[0]._doc._id
        } else {
            event.theme = {}
        }

        // loading place data
        if (event.place != null && event.place != undefined) {
            let place = await Place.find({ _id: event.place })
            event.place = { ...place[0]._doc }
            event.place.id = place[0]._doc._id
        } else {
            event.place = {}
        }

        //loading Food data
        if (event.food != null && event.food != undefined) {
            let foodList = await Promise.all(event.food.map(async function (element) {
                let food = await Food.find({ _id: element.id })
                let newElement = { ...element._doc }
                newElement.category = food[0].category
                newElement.name = food[0].name
                newElement.ingredients = food[0].ingredients
                newElement.img = food[0].img
                return newElement
            }))
            event.food = foodList
        } else {
            event.food = []
        }

        //loading Music data
        if (event.musicList != null && event.musicList != undefined) {
            let musicList = await Promise.all(event.musicList.map(async function (element) {
                let music = await Music.find({ _id: element.id })
                let newElement = { ...element._doc }
                newElement.category = music[0].category
                newElement.name = music[0].name
                newElement.phone = music[0].phone
                newElement.img = music[0].img
                return newElement
            }))
            event.musicList = musicList
        } else {
            event.musicList = []
        }

        //loading organiser
        if (event.organiser != null && event.organiser != undefined) {
            let organisers = await User.find({ _id: event.organiser })
            event.organiser = { ...organisers[0]._doc }
            event.organiser.id = organisers[0]._doc._id
        } else {
            event.organiser = {}
        }

        // console.log(theme)
        return event
    }))
    res.send(eventsToBeSent)
})

// Food routes
router.post('/food', function (req, res) {
    let foodData = req.body
    let newFood = new Food(foodData)
    newFood.save()
    res.end()

})
router.put('/food/:foodId', function (req, res) {
    let ID = req.params.foodId
    let updatedData = req.body
    Food.findOneAndUpdate({ _id: ID }, updatedData, function (req, res) {
        res.end()
    })
})

router.get('/food', function (req, res) {
    Food.find({}, function (err, foodData) {
        res.send(foodData)
    })
})

router.delete('/food/:foodId', function (req, res) {
    let ID = req.params.foodId
    Food.findOneAndDelete({ _id: ID }, function (err, foodData) {
        res.send(foodData)
    })
})


// Client routes
router.post('/Client', function (req, res) {
    let clientData = req.body
    let newclient = new CLient(clientData)
    newclient.save()
    res.end()

})

// theme routes
router.post('/theme', function (req, res) {
    let themeData = req.body
    let newtheme = new Theme(themeData)
    newtheme.save()
    res.end()

})
router.get('/theme/:category', function (req, res) {
    let category = req.params.category.toLowerCase()
    Theme.find({ category: category }, function (err, themeData) {
        res.send(themeData)
    })
})
router.get('/theme', function (req, res) {
    Theme.find({}, function (err, themeData) {
        res.send(themeData)
    })
})

// orgenaizire routes
router.post('/Organizer', function (req, res) {
    let OrganizerData = req.body
    let newOrganizer = new Organizer(OrganizerData)
    newOrganizer.save()
    res.end()
})

router.get('/Organizer', function (req, res) {
    Organizer.find({}, function (err, OrganizerData) {
        console.log(OrganizerData)
        res.send(OrganizerData)
    })
})

//music router
router.get('/music/:category', function (req, res) {
    Music.find({}, function (err, musicData) {
        res.send(musicData)
    })
})


//places routes
router.get('/place', function (req, res) {
    Place.find({}, function (err, placeData) {
        res.send(placeData)
    })
})
router.post('/place', function (req, res) {
    let placeData = req.body
    let place = new Place(placeData)
    place.save()
    res.end()
})

//flowers routes
router.get('/flower', function (req, res) {
    Flowers.find({}, function (err, flowerData) {
        res.send(flowerData)
    })
})
router.post('/flower', function (req, res) {
    let flowersData = req.body
    let flower = new Flowers(flowersData)
    flower.save()
    res.end()
})

//music routes
router.get('/music', function (req, res) {
    Music.find({}, function (err, musicData) {
        res.send(musicData)
    })
})
router.post('/music', function (req, res) {
    let musicData = req.body
    let music = new Music(musicData)
    music.save()
    res.end()
})

//user routes
router.get('/user/:usernmae/:password', function (req, res) {
    let username = req.params.username
    let password = req.params.password
    User.find({ name: username, password: password }, function (err, userData) {
        if (userData = []) {
            res.send(false)
        } else {
            res.send(userData)
        }

    })
})

router.post('/user', function (req, res) {
    const userData = req.body
    const user = new User(userData)
    user.save()
    res.end()
})

router.get('/users', function (req, res) {
    User.find({}, function (err, userData) {
        res.send(userData)
    })
})

router.get('/user/:id', function (req, res) {
    const id = req.params.id
    User.find({ _id: id }, function (err, userData) {
        res.send(userData)
    })
})


router.post('/register', async function (req, res) {
    let userData = req.body
    let tempuser = await User.find({ email: userData.email })
    if (tempuser != []) {
        return false
    }
    console.log(userData)
    let newuser = new User(userData)
    console.log(newuser)
    newuser.save()
    res.end()
})


module.exports = router