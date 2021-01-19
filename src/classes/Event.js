import {observable, makeObservable} from 'mobx'

class Event {

    constructor(id, client, status, title, occasion, date, startHour, endHour, numOfGuests, theme, food, flowers, allMusissions, places, organiser){
        this.id = id
        this.client = client
        this.status = status
        this.title = title
        this.occasion = occasion
        this.date = date
        this.startHour = startHour
        this.endHour = endHour
        this.numOfGuests = numOfGuests
        this.theme = theme
        this.food = food
        this.flowers = flowers
        this.allMusissions = allMusissions
        this.places = places
        this.organiser = organiser

        makeObservable(this, {
            client: observable,
            status: observable,
            title: observable,
            occasion: observable,
            date: observable,
            startHour: observable,
            endHour: observable,
            numOfGuests: observable,
            theme: observable,
            food: observable,
            flowers: observable,
            allMusissions: observable,
            places: observable,
            organiser: observable
        })
    }
}

export default Event