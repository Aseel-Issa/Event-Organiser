import { observable, makeObservable, action } from 'mobx'
// import axios from 'axios'
import Event from './Event'

class Store {
    constructor() {
        this.events = []

        makeObservable(this, {
            events: observable,
            loadAllEvents: action,
            updateEvent: action
        })
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