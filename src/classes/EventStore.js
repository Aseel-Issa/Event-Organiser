import { observable, makeObservable, action } from 'mobx'
// import axios from 'axios'
import Event from './Event'
import Client from './Client';
import Theme from './Theme';
import Food from './Food';
import Flowers from './Flowers';
import Music from './Music';
import Place from './Place';
import Organiser from './Organiser';

class EventStore {
    constructor() {
        this.events = []
        this.userType = ''

        makeObservable(this, {
            events: observable,
            userType: observable,
            loadAllEvents: action,
            updateEvent: action,
            loadDummyDataToStore: action
        })
    }

    loadDummyDataToStore(){
        this.userType = 'client'

        const client = new Client('1', 'Johne Smith', '050-123-456', 'johnesmith@gmail.com', 'Jerusalem, Old city, 1234')
       
        const themes = []
        const images1 = []
        images1.push('src/images/cinderella1.jpeg')
        images1.push('src/images/cinderella2.jpeg')
        images1.push('src/images/cinderella3.jpeg')
        images1.push('src/images/cinderella4.jpeg')
        const theme1 = new Theme('Cinderella', true, 'src/images/cinderella1.jpeg', images1)
        themes.push(theme1)
       
        const images2 = []
        images2.push('src/images/hawaiian1.jpeg')
        images2.push('src/images/hawaiian2.jpeg')
        const theme2 = new Theme('hawaiian', false, 'src/images/hawaiian1.jpeg', images2)
        themes.push(theme2)
        
        const food = []
        const meal1 = new Food('Dinner', 'Sea Food', 'Shrimps, Calamari, Noodles and Tomato sauce', 100, 120, 'src/images/sea-food.jpeg', 'Add dill to the recipe', true)
        food.push(meal1)
        const meal2 = new Food('Dinner', 'Barbecue', 'Dead meat, Chicken', 100, 85, 'src/images/barbecue.jpeg', null, true)
        food.push(meal2)
        
        const flowers = new Flowers('Rose', {onTable: true, price: 50}, {onEntry: true, price: 1500}, {numOfStands: 6, price: 150})

        const allMusissions = []
        const music1 = new Music('D.J', 'Toam Sawyer', '052-123-1234', 2000, 'src/images/undefindMale.png', 'Please include these songs:1 .... 2 .... 3 ....', true)
        allMusissions.push(music1)
        const music2 = new Music('D.J', 'Sara Anderson', '052-345-6789', 2200, 'src/images/undefindFemale.png', null, false)
        allMusissions.push(music2)

        const places = []
        const place1 = new Place('Park', 'Bell Park', '052-123-1234', 'Jerusalem, Tal Piot', 15000, 'src/images/bellPark.jpg', null, true)
        places.push(place1)

        const organiser = new Organiser('1', 'Aseel Issa', '054-123-1234', 'fake-email@gmail.com')
        const event = new Event(client, 'Negotiation', `Johne & Mary's Wedding`, 'Wedding', '2021-04-01', '8:00', '12:00', 100, themes, food, flowers, allMusissions, places, organiser)
        this.events.push(event)
    }

    // This function should get all the events of the logged in user
    loadAllEvents = async (clientId) => {
        // const results = await axios.get(`http://localhost:3001/events/:${clientId}`)
        // // console.log(results)
        // this.events = results.data.map(element => {
        //     return new Event(.......)
        // })
    }

    // updates an event from the client side and reflects it to the database too
    updateEvent(){

    }

}
export default EventStore