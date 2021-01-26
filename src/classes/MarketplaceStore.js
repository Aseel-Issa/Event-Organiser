
import { observable, makeObservable, action } from 'mobx'
import axios from 'axios'
import Event from './Event'
import Client from './Client';
import Theme from './Theme';
import Food from './Food';
import Flowers from './Flowers';
import Music from './Music';
import Place from './Place';
import Organiser from './Organiser';
import AssignmentRequest from './AssignmentRequest';

class MarketplaceStore {
    constructor() {
        this.events = []
        this.userType = ''
        this.organiser = null

        makeObservable(this, {
            events: observable,
            userType: observable,
            organiser: observable,
            assignEventRequest: action
        })
    }

    async getOrganiser() {
        const results = await axios.get(`http://localhost:2011/user/600ef9e9afabd51f0368227e`)
        const user = results.data[0]
        this.userType = 'organiser'
        //id, name, phone, email
        const organiser = new Organiser(user._id, user.name, user.phone, user.email)
        this.organiser = organiser
        return organiser
    }

    // This function should get all the events of the logged in user
    async loadAllPendingEvents() {
        let results
        if (this.userType == 'client') {
            // results = await axios.get(`http://localhost:2011/events/client/${userId}`)
        } else {
            results = await axios.get(`http://localhost:2011/events/pending`)
        }
        // console.log('Clients events '+JSON.stringify(results.data))
        this.events = results.data.map(element => {
            element.id = element._id
            // console.log(element)
            const event = new Event(element._id, element.client, element.status, element.title, element.occasion, element.date, element.startHour, element.endHour, element.numOfGuests, element.theme, element.food, element.flowers, element.musicList, element.place, element.organiser, element.assignmentRequests)
            console.log(JSON.stringify(event))
            return event
        })
    }

    async loadMarketplaceDummyData() {

        await this.getOrganiser()
        await this.loadAllPendingEvents()
        // this.events = []
        // this.userType = 'organiser'

        // const client = new Client('1', 'Johne Smith', '050-123-456', 'johnesmith@gmail.com', 'Jerusalem, Old city, 1234')

        // const images1 = []
        // images1.push('/images/cinderella1.jpeg')
        // images1.push('/images/cinderella2.jpg')
        // images1.push('/images/cinderella3.jpg')
        // images1.push('/images/cinderella4.jpg')
        // const theme1 = new Theme('1', 'Cinderella', true, '/images/cinderella1.jpeg', images1)


        // const food = []
        // const meal1 = new Food('1', 'Dinner', 'Sea Food', 'Shrimps, Calamari, Noodles and Tomato sauce', 100, 120, '/images/sea-food.jpg', 'Add dill to the recipe', true, null)
        // food.push(meal1)
        // const meal2 = new Food('2', 'Dinner', 'Barbecue', 'Dead meat, Chicken', 100, 85, '/images/barbecue.jpg', null, true, null)
        // food.push(meal2)

        // const flower1 = new Flowers('Rose', { onTable: true, price: 50 }, { onEntry: true, price: 1500 }, { numOfStands: 6, price: 150 })

        // const musicList = []
        // const music1 = new Music('1', 'D.J', 'Toam Sawyer', '052-123-1234', 2000, '/images/undefindMale.png', 'Please include these songs:1 .... 2 .... 3 ....', true)
        // musicList.push(music1)
        // const music2 = new Music('2', 'D.J', 'Sara Anderson', '052-345-6789', 2200, '/images/undefinedFemale.png', null, false)
        // musicList.push(music2)

        // // const places = []
        // // id, category, name, phone, address, price, img, specialComments, isChosen
        // const place1 = new Place('1', 'open space', 'Bell Park', '052-123-1234', 'Jerusalem, Tal Piot', 15000, '/images/bellPark.jpg', null, true)

        // const assignmentRequests = []
        // this.organiser = new Organiser('1', 'Aseel Issa', '054-123-1234', 'fake-email@gmail.com')
        // const event = new Event('1', client, 'Pending', `Johne & Mary's Wedding`, 'Wedding', '2021-04-01', '20:00', '00:00', 100, theme1, food, flower1, musicList, place1, null, assignmentRequests)
        // this.events.push(event)

        // const event2 = new Event('2', client, 'Pending', `Amanda's birthday party`, 'birthday', '2021-04-01', '20:00', '00:00', 30, theme1, food, flower1, musicList, place1, null, assignmentRequests)
        // this.events.push(event2)

        // const event3 = new Event('3', client, 'Pending', `George's baptism`, 'baptism', '2021-02-01', '09:00', '10:00', 30, theme1, food, flower1, null, place1, null, assignmentRequests)
        // this.events.push(event3)
    }

    async assignEventRequest(event) {
        const assignmentReq = new AssignmentRequest(this.organiser)
        const eventIndex = this.events.findIndex(element => { return element.id == event.id })
        const localEvent = { ...this.events[eventIndex] }
        localEvent.assignmentRequests.push(assignmentReq)
        console.log(eventIndex)
        if (eventIndex != -1) {
            // update event in database too
            const newEvent = { ...event }
            newEvent.client = event.client.id
            newEvent.theme = event.theme ? event.theme.id : null
            newEvent.food = event.food.map(element => {
                return { id: element.id, price: element.price }
            })
            newEvent.musicList = event.musicList.map(element => {
                return { id: element.id, price: element.price }
            })
            const flowersId = this.flowers.find(element => {
                return element.category == event.flowers.category
            })
            newEvent.flowers = {
                id: flowersId,
                table: event.flowers.table,
                entry: event.flowers.entry,
                stands: event.flowers.stands
            }
            newEvent.place = event.place.id
            newEvent.organiser = event.organizer ? event.organizer.id : null
            newEvent.assignmentRequests.push(this.organiser.id)
            try {
                const result = await axios.put(`http://localhost:2011/event`, newEvent)
                this.events[eventIndex].assignmentRequests.push(assignmentReq)
                console.log('Event: ' + JSON.stringify(this.events[eventIndex]))
                return true
            } catch (e) {
                console.log('Changes was not save to database')
                console.log(e)
            } finally {
                return false
            }
        }
    }
}
export default MarketplaceStore